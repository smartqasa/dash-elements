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
import { selectOptionDialog } from '../dialogs/select-option-dialog';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  trigger?: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-select-tile',
  name: 'SmartQasa Select Tile',
  preview: true,
  description: 'A SmartQasa tile for displaying an Input Select entity.',
});

@customElement('smartqasa-select-tile')
export class SelectTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:form-dropdown';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Select';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('input_select.')) {
      console.error('Invalid input_select entity provided in the config.');
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
      <div class="container" @click=${this.showOptions}>
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
    if (this.config && this.hass && this.stateObj) {
      icon =
        this.config.icon ||
        this.stateObj.attributes?.icon ||
        'hass:form-dropdown';
      iconColor = 'var(--sq-inactive-rgb)';
      name =
        this.config.name ||
        this.stateObj.attributes?.friendly_name ||
        'Select List';
      stateFmtd = this.hass.formatEntityState(this.stateObj) || 'Unknown';
    } else {
      icon = this.config?.icon || 'hass:form-dropdown';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config?.name || 'Unknown';
      stateFmtd = 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this.icon = icon;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private showOptions(e: Event): void {
    e.stopPropagation();
    selectOptionDialog(this.config, this.stateObj);
  }
}
