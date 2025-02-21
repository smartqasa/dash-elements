import {
  CSSResultGroup,
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
import { callService } from '../utilities/call-service';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
  automation: string;
  sensor?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-motion-chip',
  name: 'SmartQasa Motion Sensor Chip',
  preview: true,
  description:
    'A SmartQasa chip for toggling a motion sensor automation entity.',
});

@customElement('smartqasa-motion-chip')
export class MotionChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private automationObj?: HassEntity;
  @state() private sensorObj?: HassEntity;

  private automation?: string;
  private sensor?: string;
  private icon: string = 'hass:motion-sensor';
  private iconStyles: Record<string, string> = {};
  private name: string = '';

  static get styles(): CSSResultGroup {
    return [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];
  }

  public setConfig(config: Config): void {
    if (!config.automation?.startsWith('automation.')) {
      console.error('A valid automation entity must be provided.');
      this.config = undefined;
      return;
    }
    if (config.sensor && !config.sensor.startsWith('binary_sensor.')) {
      console.error('A valid binary sensor entity must be provided.');
      this.config = undefined;
      return;
    }

    this.config = config;
    this.automation = config.automation;
    this.sensor = config.sensor;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass')) {
      const newAutomationState = this.automation
        ? this.hass?.states[this.automation]
        : undefined;
      const newSensorState = this.sensor
        ? this.hass?.states[this.sensor]
        : undefined;

      return (
        newAutomationState !== this.automationObj ||
        newSensorState !== this.sensorObj
      );
    }

    return false;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;

    return html`
      <div class="container" @click=${this.toggleEntity}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        ${this.name ? html`<div class="text">${this.name}</div>` : null}
      </div>
    `;
  }

  private updateState(): void {
    this.automationObj = this.automation
      ? this.hass?.states[this.automation]
      : undefined;
    this.sensorObj = this.sensor ? this.hass?.states[this.sensor] : undefined;

    const { icon, iconColor } = this.getIconAndColor();
    this.icon = icon;
    this.name = this.config?.name || '';

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      paddingRight: this.name
        ? 'calc(var(--sq-chip-padding) / 2)'
        : 'var(--sq-chip-padding)',
    };
  }

  private getIconAndColor(): { icon: string; iconColor: string } {
    let icon = 'hass:motion-sensor-off';
    let iconColor = 'var(--sq-unavailable-rgb)';

    if (this.automationObj) {
      switch (this.automationObj.state) {
        case 'on':
          icon = 'hass:motion-sensor';
          iconColor =
            this.sensorObj?.state === 'on'
              ? 'var(--sq-blue-rgb)'
              : 'var(--sq-primary-font-rgb)';
          break;
        case 'off':
          icon = 'hass:motion-sensor-off';
          iconColor = 'var(--sq-red-rgb)';
          break;
      }
    } else {
      icon = this.config?.icon || 'hass:motion-sensor-off';
    }

    return { icon, iconColor };
  }

  private toggleEntity(e: Event): void {
    e.stopPropagation();
    callService(this.hass, 'automation', 'toggle', {
      entity_id: this.automation,
    });
  }
}
