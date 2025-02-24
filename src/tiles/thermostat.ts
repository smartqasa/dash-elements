import {
  CSSResult,
  html,
  LitElement,
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
import { thermostatIcons, thermostatColors } from '../const';
import { formatState } from '../utilities/format-state';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-thermostat-tile',
  name: 'SmartQasa Thermostat Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a thermostat climate entity.',
});

@customElement('smartqasa-thermostat-tile')
export class ThermostatTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:thermostat';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Thermostat';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('climate.')) {
      console.error('Invalid climate entity provided in the config.');
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

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult {
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
    if (this.stateObj && this.hass) {
      const state = this.stateObj.state || 'unknown';

      icon = thermostatIcons[state] || thermostatIcons.default;
      const hvacAction = this.stateObj.attributes.hvac_action || 'idle';
      if (state === 'off') {
        iconColor = thermostatColors.off;
      } else {
        iconColor = thermostatColors[hvacAction] || thermostatColors.idle;
      }
      name =
        this.config!.name ||
        this.stateObj.attributes.friendly_name ||
        'Thermostat';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config!.icon || 'hass:thermostat';
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

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
