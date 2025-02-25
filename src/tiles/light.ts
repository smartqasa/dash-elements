import {
  CSSResult,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { formatState } from '../utilities/format-state';
import { callService } from '../utilities/call-service';
import { moreInfoDialog } from '../dialogs/more-info-dialog';
import { entityListDialog } from '../dialogs/entity-list-dialog';
import { dialogPopup } from '../dialogs/dialog-popup';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  color_icon?: boolean;
  name?: string;
  grid?: string[];
  grid_columns?: number;
  grid_style?: 'circle' | 'square';
  group?: string;
}

window.customCards.push({
  type: 'smartqasa-light-tile',
  name: 'SmartQasa Light Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a light entity.',
});

@customElement('smartqasa-light-tile')
export class LightTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 2;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:lightbulb-alert';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Light';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('light.')) {
      console.error('Invalid light entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass'))
      return (
        (this.entity ? this.hass?.states[this.entity] : undefined) !==
        this.stateObj
      );

    return false;
  }

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div
        class="container"
        @click=${this.toggleEntity}
        @contextmenu=${this.showEntityList}
      >
        <div
          class="icon"
          @click=${this.showMoreInfo}
          style=${styleMap(this.iconStyles)}
        >
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this.name}</div>
          <div class="state">${this.stateFmtd}</div>
        </div>
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let backgroundAlpha, backgroundColor, icon, iconColor, name, stateFmtd;
    if (this.stateObj) {
      const state = this.stateObj.state || 'unknown';
      icon =
        this.config!.icon || this.stateObj.attributes.icon || 'hass:lightbulb';

      if (
        this.config?.color_icon &&
        state === 'on' &&
        this.stateObj.attributes.rgb_color
      ) {
        iconColor = 'var(--sq-inactive-rgb)';
        backgroundColor = this.stateObj.attributes.rgb_color.join(',');
        backgroundAlpha = 0.5;
      } else {
        iconColor =
          state === 'on' ? 'var(--sq-light-on-rgb)' : 'var(--sq-inactive-rgb)';
        backgroundColor = iconColor;
        backgroundAlpha = 'var(--sq-icon-alpha)';
      }

      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Light';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config?.icon || 'hass:lightbulb-alert';
      iconColor = 'var(--sq-unavailable-rgb)';
      backgroundColor = iconColor;
      backgroundAlpha = 'var(--sq-icon-alpha)';
      name = this.config?.name || 'Unknown Light';
      stateFmtd = 'Unknown State';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${backgroundColor}, ${backgroundAlpha})`,
    };
    this.icon = icon;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private async toggleEntity(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    try {
      if (this.stateObj.state === 'on') {
        await callService(
          this.hass,
          'light',
          'turn_off',
          { transition: 2 },
          { entity_id: this.entity }
        );
      } else {
        await callService(this.hass, 'light', 'turn_on', undefined, {
          entity_id: this.entity,
        });
      }
    } catch (error) {
      console.error(`Failed to toggle ${this.entity}:`, error);
    }
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }

  private showEntityList(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.config || !this.stateObj) return;

    if (Array.isArray(this.config.grid) && this.config.grid.length > 0) {
      dialogPopup({
        title: this.stateObj.attributes.friendly_name || 'Light Group',
        timeout: 120000,
        content: {
          type: 'custom:smartqasa-light-grid-card',
          title: this.stateObj.attributes.friendly_name || 'Light Group',
          columns: this.config.grid_columns ?? 3,
          style: this.config.grid_style ?? 'circle',
          entities: this.config.grid,
        },
      });

      return;
    }

    let group: string | undefined;

    if (this.config.group && this.hass.states[this.config.group]) {
      group = this.config.group;
    } else if (this.stateObj.attributes?.entity_id?.length > 0) {
      group = this.entity;
    } else {
      group = `${this.entity}_group`;
    }

    const groupObj = group ? this.hass.states[group] : undefined;
    if (!groupObj || !groupObj.attributes?.entity_id?.length) return;

    entityListDialog(
      this.stateObj.attributes?.friendly_name ?? 'Unknown',
      'group',
      group,
      'light'
    );
  }
}
