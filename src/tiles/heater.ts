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
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { moreInfoDialog } from '../dialogs/more-info-dialog';
import { heaterColors } from '../const';
import { formatState } from '../utilities/format-state';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-heater-tile',
  name: 'SmartQasa Heater Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a water heater entity.',
});

@customElement('smartqasa-heater-tile')
export class HeaterTile extends LitElement implements LovelaceCard {
  getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private stateObj?: HassEntity;
  private entity?: string;
  private icon: string = 'hass:water-boiler-alert';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Heater';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('water_heater.')) {
      console.error('Invalid water_heater entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass')) {
      const newState = this.entity ? this.hass?.states[this.entity] : undefined;

      return newState !== this.stateObj;
    }

    return false;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.showMoreInfo}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
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

    let icon, iconColor, name, stateFmtd;
    if (this.stateObj) {
      const state = this.stateObj.state || 'unknown';
      icon = this.config!.icon || 'hass:water-boiler';
      iconColor = heaterColors[state] || heaterColors.idle;
      name =
        this.config!.name ||
        this.stateObj.attributes.friendly_name ||
        'Water Heater';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config!.icon || 'hass:water-boiler-alert';
      iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
      name = this.config!.name || 'Unknown Heater';
      stateFmtd = 'Unknown State';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this.icon = icon;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
