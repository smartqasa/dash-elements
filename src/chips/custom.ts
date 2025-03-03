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
  DialogObj,
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
  dialog_file: string;
}

window.customCards.push({
  type: 'smartqasa-custom-chip',
  name: 'SmartQasa Custom Chip',
  preview: true,
  description: 'A SmartQasa chip for displaying a custom dialog.',
});

@customElement('smartqasa-custom-chip')
export class CustomChip extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private dialogObj?: DialogObj;
  @state() private stateObj?: HassEntity;

  private entity?: string;

  static get styles(): CSSResultGroup {
    return [chipBaseStyle, chipTextStyle];
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
    }

    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;
    if (changedProps.has('hass') && this.entity)
      return this.hass?.states[this.entity] !== this.stateObj;
    return false;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.dialogObj) return nothing;

    const icon = this.dialogObj.icon || 'mdi:help-circle';
    let iconColor = 'var(--sq-primary-text-rgb)';

    if (this.entity) {
      this.stateObj = this.hass?.states[this.entity];

      if (this.stateObj) {
        const state = this.stateObj.state || 'unknown';
        iconColor =
          state === 'on'
            ? (this.dialogObj.active_color ?? 'rgb(var(--sq-orange-rgb))')
            : 'rgb(var(--sq-inactive-rgb))';
      } else {
        iconColor = 'var(--sq-unavailable-rgb)';
      }
    }

    let text = '';
    if (this.dialogObj.show_state) {
      text = this.stateObj?.state || '';
      switch (this.dialogObj.entity_type) {
        case 'temperature':
          text += '°';
          break;
        case 'percentage':
          text += '%';
          break;
      }
    }

    const iconStyles = {
      color: iconColor,
      backgroundColor: 'transparent',
      paddingRight: text
        ? 'calc(var(--sq-chip-padding) / 2)'
        : 'var(--sq-chip-padding)',
    };

    return html`
      <div class="container" @click=${this.showDialog}>
        <div class="icon" style="${styleMap(iconStyles)}">
          <ha-icon icon=${icon}></ha-icon>
        </div>
        ${text ? html`<div class="text">${text}</div>` : null}
      </div>
    `;
  }

  private showDialog(e: Event): void {
    e.stopPropagation();
    const dialogObj = this.dialogObj;
    if (dialogObj?.data) window.browser_mod?.service('popup', dialogObj.data);
  }
}
