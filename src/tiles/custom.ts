import {
  CSSResult,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
  unsafeCSS,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  DialogObj,
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { formatState } from '../utilities/format-state';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  dialog_file: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-custom-tile',
  name: 'SmartQasa custom Tile',
  preview: true,
  description: 'A SmartQasa tile for displaying a custom dialog.',
});

@customElement('smartqasa-custom-tile')
export class DialogTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 2;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private dialogObj?: DialogObj;
  @state() private stateObj?: HassEntity;

  private entity?: string;
  private icon: string = 'mdi:help-circle';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Dialog';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public async setConfig(config: Config): Promise<void> {
    if (!config.dialog_file) {
      console.error('dialog_file must be provided in the config.');
      return;
    }

    try {
      const path = `/local/smartqasa/custom/dialogs/${config.dialog_file}`;
      this.dialogObj = (await loadYamlAsJson(path)) as DialogObj;
      this.entity = this.dialogObj.entity;
    } catch (error) {
      console.error('Failed to load YAML:', error);
    } finally {
      if (this.dialogObj) {
        this.icon = config.icon || this.dialogObj.icon || 'mdi:help-circle';
        this.name = config.name || this.dialogObj.name || 'Unknown';
      }
    }

    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass') && this.entity) {
      const newState = this.hass?.states[this.entity];
      return newState !== this.stateObj;
    }

    return false;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this.showDialog}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this.name}</div>
          ${this.stateFmtd
            ? html`<div class="state">${this.stateFmtd}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private updateState(): void {
    let iconColor, stateFmtd;

    if (this.entity) {
      this.stateObj = this.hass?.states[this.entity];

      if (this.stateObj) {
        const state = this.stateObj.state || 'unknown';
        iconColor =
          state === 'on'
            ? (this.config?.dialog?.active_color ??
              this.config?.active_color ??
              'var(--sq-orange-rgb)')
            : 'var(--sq-inactive-rgb)';
        stateFmtd = formatState(this.hass!, this.entity);
      } else {
        iconColor = 'var(--sq-unavailable-rgb)';
        stateFmtd = 'Unknown State';
      }
    } else {
      iconColor = 'var(--sq-inactive-rgb)';
      stateFmtd = '';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this.stateFmtd = stateFmtd;
  }

  private showDialog(e: Event): void {
    e.stopPropagation();
    const dialogObj = this.dialogObj;
    if (dialogObj?.data) window.browser_mod?.service('popup', dialogObj.data);
  }
}
