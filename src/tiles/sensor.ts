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

import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { moreInfoDialog } from '../dialogs/more-info-dialog';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  category?: string;
  entity: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-sensor-tile',
  name: 'SmartQasa Sensor Tile',
  preview: true,
  description: 'A SmartQasa tile for observing a binary_sensor entity.',
});

@customElement('smartqasa-sensor-tile')
export class SensorTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;
  private stateObj?: HassEntity;
  private iconStyles: Record<string, string> = {};
  private iconTemplate?: TemplateResult;
  private name: string = 'Unknown Sensor';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('binary_sensor.')) {
      console.error('Invalid binary_sensor entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;
    if (changedProps.has('hass') && this.entity)
      return this.hass?.states[this.entity] !== this.stateObj;
    return false;
  }

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.showMoreInfo}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          ${this.iconTemplate}
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

    let iconTemplate, iconColor, name, stateFmtd;
    if (this.stateObj) {
      if (!this.config!.icon) {
        iconTemplate = html`<ha-state-icon
          .hass=${this.hass}
          .stateObj=${this.stateObj}
        ></ha-state-icon>`;
      } else {
        iconTemplate = html`<ha-icon icon=${this.config!.icon}></ha-icon>`;
      }
      iconColor =
        this.stateObj.state === 'on'
          ? 'var(--sq-binary_sensor-on-rgb)'
          : 'var(--sq-inactive-rgb)';
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Sensor';
      stateFmtd = this.hass!.formatEntityState(this.stateObj);
    } else {
      iconTemplate = html`<ha-icon icon="hass:leak"></ha-icon>`;
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config!.name || 'Unknown';
      stateFmtd = 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this.iconTemplate = iconTemplate;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
