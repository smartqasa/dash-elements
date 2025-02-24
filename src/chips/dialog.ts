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
  DialogEntry,
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { dialogTable } from '../dialogs/dialog-table';
import { dialogPopup } from '../dialogs/dialog-popup';

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
  dialog: keyof typeof dialogTable;
  label?: string;
}

window.customCards.push({
  type: 'smartqasa-dialog-chip',
  name: 'SmartQasa Dialog Chip',
  preview: true,
  description: 'A SmartQasa chip for displaying a dialog.',
});

@customElement('smartqasa-dialog-chip')
export class DialogChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private dialog?: keyof typeof dialogTable;
  private dialogObj?: DialogEntry;
  private entity?: string;
  private icon: string = 'hass:message-outline';
  private label?: string;
  private stateObj?: HassEntity;

  static get styles(): CSSResultGroup {
    return [chipBaseStyle, chipTextStyle];
  }

  public setConfig(config: Config): void {
    if (!config.dialog) return;

    this.config = config;
    this.dialog = this.config.dialog;
    this.dialogObj = dialogTable[this.dialog];

    this.entity = this.dialogObj?.entity;
    this.icon = this.dialogObj?.icon || 'hass:help-alert';
    this.label = this.config.label || '';
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      (changedProps.has('hass') &&
        this.entity &&
        this.hass?.states[this.entity] !== this.stateObj) ||
      changedProps.has('config')
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.dialogObj) return nothing;

    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    const state = this.stateObj?.state || 'unknown';
    const display =
      (this.dialog === 'garages' && state === 'closed') ||
      (this.dialog === 'locks' && state === 'locked') ||
      (this.dialog === 'sensors_doors' && state === 'off') ||
      (this.dialog === 'sensors_windows' && state === 'off')
        ? 'none'
        : 'flex';
    const containerStyles = {
      display: `${display}`,
    };

    const iconStyles = {
      color: this.dialogObj.color || 'rgb(var(--sq-orange-rgb))',
      paddingRight: this.label
        ? 'calc(var(--sq-chip-padding) / 2)'
        : 'var(--sq-chip-padding)',
    };

    return html`
      <div
        class="container"
        style="${styleMap(containerStyles)}"
        @click=${this.showDialog}
      >
        <div class="icon" style="${styleMap(iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        ${this.label ? html`<div class="text">${this.label}</div>` : nothing}
      </div>
    `;
  }

  private showDialog(e: Event): void {
    e.stopPropagation();
    if (!this.dialogObj) return;

    dialogPopup(this.dialogObj.data);
  }
}
