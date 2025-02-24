import {
  CSSResultGroup,
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
import { moreInfoDialog } from '../dialogs/more-info-dialog';
import { thermostatIcons, thermostatColors } from '../const';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
  entity?: string;
}

window.customCards.push({
  type: 'smartqasa-theromstat-chip',
  name: 'SmartQasa Thermostat Chip',
  preview: true,
  description: 'A SmartQasa chip that displays a thermostat.',
});

@customElement('smartqasa-thermostat-chip')
export class ThermostatChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:thermostat';
  private iconStyles: Record<string, string> = {};
  private temperature: string = '??';

  static get styles(): CSSResultGroup {
    return [chipBaseStyle, chipTextStyle];
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('climate.')) {
      console.error('Invalid climate entity provided in the config.');
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

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.entity) return nothing;

    return html`
      <div class="container" @click=${this.showMoreInfo}>
        <div class="icon" id="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">${this.temperature}°</div>
      </div>
    `;
  }

  private updateState() {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let icon, iconColor, temperature;
    if (this.stateObj) {
      const state = this.stateObj.state;
      icon = thermostatIcons[state] || thermostatIcons.default;
      const hvacAction = this.stateObj.attributes.hvac_action;
      iconColor = thermostatColors[hvacAction] || thermostatColors.default;
      temperature = this.stateObj.attributes.current_temperature || '??';
    } else {
      icon = thermostatIcons.default;
      iconColor = thermostatColors.default;
      temperature = '??';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
    };
    this.icon = icon;
    this.temperature = temperature;
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
