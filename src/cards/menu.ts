import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';
import { getDeviceType, getDeviceOrientation } from '../utilities/device-info';
import { createElement } from '../utilities/create-element';

interface Tab {
  tab: string;
  icon: string;
  tiles: LovelaceCardConfig[];
}

@customElement('smartqasa-menu-card')
export class MenuCard extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 4;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private tabs: Tab[] = [];
  @state() private bodyTiles: LovelaceCard[][] = [];
  @state() private menuTab: number = window.smartqasa.menuTab || 0;
  @state() private isAdminMode: boolean = false;
  private gridStyle = {};

  private boundHandleDeviceChanges: () => void;
  private deviceType = getDeviceType();

  public setConfig(): void {}

  static get styles() {
    return css`
      :host {
        border: none;
        background-color: transparent;
      }
      .container {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows:
          auto
          1fr;
        overflow: hidden;
      }
      .tab-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .tab {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: var(--sq-primary-font-size);
        font-weight: var(--sq-primary-font-weight);
        color: rgb(var(--sq-inactive-rgb));
        transition: background-color 0.3s;
        cursor: pointer;
      }
      .tab[selected] {
        font-weight: var(--sq-primary-font-weight);
        color: rgb(var(--sq-primary-font-rgb));
      }
      .tab ha-icon {
        margin-right: 0.5rem;
      }
      .tab[icon-only] ha-icon {
        margin-right: 0;
      }
      .tab[icon-only] span {
        display: none;
      }
      .tiles {
        display: grid;
        padding: 1rem 0 0 0;
        gap: var(--sq-tile-spacing);
        grid-auto-rows: var(--sq-tile-height);
        overflow-y: auto;
      }
    `;
  }

  constructor() {
    super();
    this.boundHandleDeviceChanges = this.handleDeviceChanges.bind(this);
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.loadMenuTabs().catch((error) => {
      console.error('Error loading menu tabs and tiles:', error);
    });

    this.handleDeviceChanges();

    window.addEventListener('resize', this.boundHandleDeviceChanges);
    window.addEventListener('orientationchange', this.boundHandleDeviceChanges);
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has('hass') && this.hass) {
      const currentTiles = this.bodyTiles[this.menuTab] || [];
      currentTiles.forEach((tile) => {
        if (tile.hass !== this.hass) tile.hass = this.hass;
      });

      const isAdminMode =
        this.hass.states['input_boolean.admin_mode']?.state === 'on';
      this.isAdminMode = (this.hass.user?.is_admin ?? false) || isAdminMode;
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('resize', this.boundHandleDeviceChanges);
    window.removeEventListener(
      'orientationchange',
      this.boundHandleDeviceChanges
    );
  }

  protected render(): TemplateResult {
    const currentTiles = this.bodyTiles[this.menuTab] || [];

    return html`
      <div class="container">
        <div class="tab-bar">
          ${this.tabs.map((tab, index) => {
            if (tab.tab === 'Utilities' && !this.isAdminMode) {
              return nothing;
            }
            return html`
              <div
                class="tab"
                ?selected=${this.menuTab === index}
                @click="${() => this.setMenuTab(index)}"
                ?icon-only=${this.deviceType === 'phone'}
              >
                <ha-icon icon="${tab.icon}"></ha-icon>
                <span>${tab.tab}</span>
              </div>
            `;
          })}
        </div>
        <div class="tiles" style=${styleMap(this.gridStyle)}>
          ${currentTiles.map((tile) => html`<div>${tile}</div>`)}
        </div>
      </div>
    `;
  }

  private handleDeviceChanges(): void {
    const type = getDeviceType();
    const orientation = getDeviceOrientation();

    if (type === 'phone') {
      this.gridStyle = {
        gridTemplateColumns: orientation === 'landscape' ? '1fr 1fr' : '1fr',
      };
    } else {
      this.gridStyle = {
        gridTemplateColumns: 'repeat(3, var(--sq-tile-width, 19.5rem))',
      };
    }
  }

  private async loadMenuTabs(): Promise<void> {
    try {
      const tabsData = (await loadYamlAsJson(
        '/local/smartqasa/custom/menu.yaml'
      )) as Tab[];
      if (!Array.isArray(tabsData)) {
        throw new Error('Invalid tabs configuration');
      }
      this.tabs = tabsData;
    } catch (error) {
      console.error('Error loading menu tabs and tiles:', error);
    }

    const utilMenuTab = {
      tab: 'Utilities',
      icon: 'mdi:toolbox',
      tiles: [
        {
          type: 'custom:smartqasa-dialog-tile',
          dialog: 'clean_screen',
        },

        {
          type: 'custom:smartqasa-dialog-tile',
          dialog: 'display_mode',
        },

        {
          type: 'custom:smartqasa-select-tile',
          entity: 'input_select.dashboard_background',
        },

        {
          type: 'custom:smartqasa-action-tile',
          icon: 'mdi:refresh',
          name: 'Refresh Devices',
          actions: [
            {
              action: 'input_button.press',
              target: {
                entity_id: 'input_button.refresh_devices',
              },
            },
          ],
        },
        {
          type: 'custom:smartqasa-action-tile',
          icon: 'mdi:restart',
          name: 'Reboot Devices',
          actions: [
            {
              action: 'input_button.press',
              target: {
                entity_id: 'input_button.reboot_devices',
              },
            },
          ],
        },
        {
          type: 'custom:smartqasa-action-tile',
          icon: 'mdi:wiper',
          name: 'Clear Cache (this device)',
          actions: [
            {
              action: 'browser_mod.javascript',
              data: {
                code: 'fully.clearCache()',
              },
            },
          ],
        },
        {
          type: 'custom:smartqasa-dialog-tile',
          dialog: 'speed_test',
        },
        {
          type: 'custom:smartqasa-action-tile',
          icon: 'mdi:restart',
          name: 'Reboot System',
          actions: [
            {
              action: 'hassio.host_reboot',
            },
          ],
        },
        {
          type: 'custom:smartqasa-action-tile',
          icon: 'mdi:power',
          name: 'Shutdown System',
          actions: [
            {
              action: 'hassio.host_shutdown',
            },
          ],
        },
        {
          type: 'custom:smartqasa-app-tile',
          app: 'play_store',
          icon: 'mdi:store',
        },
      ],
    };

    this.tabs.push(utilMenuTab);

    this.bodyTiles = await Promise.all(
      this.tabs.map((tab) => this.loadMenuTiles(tab.tiles))
    );
  }

  private async loadMenuTiles(
    tilesConfig: LovelaceCardConfig[]
  ): Promise<LovelaceCard[]> {
    const tiles: LovelaceCard[] = [];
    for (const config of tilesConfig) {
      /*config.callingDialog = {
                title: "Menu",
                timeout: 120000,
                content: {
                    type: "custom:smartqasa-menu-card",
                },
            };*/
      const tile = createElement(config) as LovelaceCard;
      if (tile) {
        tile.hass = this.hass;
        tiles.push(tile);
      } else {
        console.error('Failed to create tile for config:', config);
      }
    }
    return tiles;
  }

  private setMenuTab(index: number): void {
    this.menuTab = index;
    window.smartqasa.menuTab = index;

    const currentTiles = this.bodyTiles[this.menuTab] || [];
    currentTiles.forEach((tile) => {
      tile.hass = this.hass;
    });
  }
}
