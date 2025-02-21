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

import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { selectOptionDialog } from '../dialogs/select-option-dialog';
import { phaseIcons, modeIcons } from '../const';

import chipBaseStyle from '../css/chip-base.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  trigger?: string;
  icon?: string;
}

window.customCards.push({
  type: 'smartqasa-select-chip',
  name: 'SmartQasa Input Select Chip',
  preview: true,
  description:
    'A SmartQasa chip for selecting an option for a input_select entity.',
});

@customElement('smartqasa-select-chip')
export class SelectChip extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;
  private stateObj?: HassEntity;

  static styles: CSSResult = unsafeCSS(chipBaseStyle);

  public setConfig(config: Config): void {
    if (!config.entity || !config.entity.startsWith('input_select.')) {
      throw new Error(
        "entity must be provided in the config and start with 'input_select.'."
      );
    }

    this.config = config;
    this.entity = config.entity;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass')) {
      const newState = this.entity ? this.hass?.states[this.entity] : undefined;

      return newState !== this.stateObj;
    }

    return false;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.entity) return nothing;

    let icon;

    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    const state = this.stateObj?.state || 'unknown';
    if (this.entity === 'input_select.location_phase') {
      icon = phaseIcons[state] || phaseIcons.default;
    } else if (this.entity === 'input_select.location_mode') {
      icon = modeIcons[state] || modeIcons.default;
    } else {
      icon =
        this.config?.icon ||
        this.stateObj?.attributes?.icon ||
        'hass:form-dropdown';
    }
    return html`
      <div class="container" @click=${this.showOptions}>
        <div class="icon">
          <ha-icon icon=${icon}></ha-icon>
        </div>
      </div>
    `;
  }

  private showOptions(e: Event): void {
    e.stopPropagation();
    selectOptionDialog(this.config, this.stateObj);
  }
}
