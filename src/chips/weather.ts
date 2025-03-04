import {
  CSSResultGroup,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { dialogTable } from '../dialogs/dialog-table';
import { appTable } from '../tables/apps';
import { launchApp } from '../utilities/launch-app';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
  entity?: string;
  app?: string;
}

window.customCards.push({
  type: 'smartqasa-weather-chip',
  name: 'SmartQasa Weather Chip',
  preview: true,
  description: 'A SmartQasa chip for displaying the weather card.',
});

@customElement('smartqasa-weather-chip')
export class WeatherChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;
  private stateObj?: HassEntity;
  private app?: string;

  static get styles(): CSSResultGroup {
    return [chipBaseStyle, chipTextStyle];
  }

  public setConfig(config: Config): void {
    if (config.entity && !config.entity?.startsWith('weather.')) {
      console.error('Invalid weather entity provided in the config.');
      return;
    }

    if (config.app && !appTable[config.app]) {
      console.error('Invalid app provided in the config.');
      return;
    }

    this.entity = config.entity ?? 'weather.forecast_home';
    this.app = config.app ?? 'weather';
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;
    if (changedProps.has('hass') && this.entity)
      return this.hass?.states[this.entity] !== this.stateObj;
    return false;
  }

  protected willUpdate(): void {
    if (this.entity && this.hass?.states[this.entity]) {
      this.stateObj = this.hass.states[this.entity];
    } else {
      this.stateObj = undefined;
    }
  }

  protected render(): TemplateResult {
    let iconColor, temperature;

    if (this.stateObj) {
      iconColor = 'var(--sq-primary-text-rgb)';
      temperature = this.stateObj?.attributes?.temperature || '??';
    } else {
      iconColor = 'var(--sq-unavailable-rgb)';
      temperature = '??';
    }

    return html`
      <div class="container" @click=${this.showDialog}>
        <div class="icon" style="color: rgb(${iconColor});">
          <ha-state-icon
            .hass=${this.hass}
            .stateObj=${this.stateObj}
          ></ha-state-icon>
        </div>
        <div class="text">${temperature}°</div>
      </div>
    `;
  }

  private async showDialog(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.config) return;

    if (typeof window.fully !== 'undefined' && this.app) {
      await launchApp(this.app, 2);
    }

    const dialogObj = dialogTable.weather;
    if (dialogObj?.data) window.browser_mod?.service('popup', dialogObj.data);
  }
}
