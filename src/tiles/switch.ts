import {
  CSSResult,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
  css,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from '../types';
import { callService } from '../utilities/call-service';
import { moreInfoDialog } from '../dialogs/more-info-dialog';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  category?: string;
  entity: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-switch-tile',
  name: 'SmartQasa Switch Tile',
  preview: true,
  description: 'A SmartQasa tile for toggling an entity.',
});

@customElement('smartqasa-switch-tile')
export class SwitchTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config?: Config;
  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:toggle-switch-variant';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Fan';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    this.entity = ['fan', 'input_boolean', 'light', 'switch'].includes(
      config.entity?.split('.')[0]
    )
      ? config.entity
      : undefined;
    this.config = {
      type: config.type,
      entity: config.entity || '',
      icon: config.icon || '',
      name: config.name || '',
      category: config.category || '',
    };
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

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.toggleEntity}>
        <div
          class="icon"
          @click=${this.showMoreInfo}
          style="${styleMap(this.iconStyles)}"
        >
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
      icon =
        this.config!.icon ||
        this.stateObj.attributes.icon ||
        'hass:toggle-switch-variant';
      const state = this.stateObj.state;
      iconColor =
        state === 'on'
          ? `var(--sq-switch${this.config!.category ? `-${this.config!.category}` : ''}-on-rgb)`
          : 'var(--sq-inactive-rgb)';
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Switch';
      stateFmtd = this.hass!.formatEntityState(this.stateObj);
    } else {
      icon = this.config!.icon || 'hass:toggle-switch-variant';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config!.name || 'Unknown Switch';
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

  private async toggleEntity(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    const domain = this.entity.split('.')[0];
    const service = 'toggle';
    const data = undefined;
    const target = { entity_id: this.entity };

    await callService(this.hass, domain, service, data, target);
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }

  public static getConfigElement(): LovelaceCardEditor {
    return document.createElement(
      'smartqasa-switch-tile-editor'
    ) as LovelaceCardEditor;
  }

  static getStubConfig(): Record<string, any> {
    return { entity: '', icon: '', name: '', category: '' };
  }
}

@customElement('smartqasa-switch-tile-editor')
export class SmartqasaSwitchTileEditor
  extends LitElement
  implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  public setConfig(config: Config): void {
    this.config = config;
  }

  static get styles() {
    return css`
      .config {
        margin-bottom: 10px;
      }
      label {
        display: block;
        margin-bottom: 5px;
        color: var(--primary-text-color);
      }
    `;
  }

  entityChanged(ev: CustomEvent) {
    this.updateConfig('entity', ev.detail.value || '');
  }

  iconChanged(ev: Event | CustomEvent) {
    this.updateConfig('icon', (ev as CustomEvent).detail.value || '');
  }

  valueChanged(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const property = target.name;
    const value = target.value;
    if (property) {
      this.updateConfig(property, value);
    }
  }

  private updateConfig(property: string, value: string) {
    if (!this.config) return;
    const config = { ...this.config };
    if (value === '') {
      delete config[property];
    } else {
      config[property] = value;
    }
    this.config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: config },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    return html`
      ${this.renderParameter({
        label: 'Entity',
        type: 'entity-picker',
        value: this.config.entity || '', // Ensure default empty string
        domains: ['switch', 'light', 'fan', 'input_boolean'],
        onChange: (ev: Event | CustomEvent) =>
          this.entityChanged(ev as CustomEvent),
      })}
      ${this.renderParameter({
        label: 'Icon',
        type: 'icon-picker',
        value: this.config.icon || '',
        onChange: (ev: Event | CustomEvent) => this.iconChanged(ev),
      })}
      ${this.renderParameter({
        label: 'Name',
        type: 'text',
        name: 'name',
        value: this.config.name || '',
        placeholder: 'Enter a custom name',
        onChange: this.valueChanged,
      })}
      ${this.renderParameter({
        label: 'Category',
        type: 'text',
        name: 'category',
        value: this.config.category || '',
        placeholder: 'Enter a category',
        onChange: this.valueChanged,
      })}
    `;
  }

  private renderParameter(options: {
    label: string;
    type: 'entity-picker' | 'icon-picker' | 'text';
    value: string;
    name?: string;
    domains?: string[];
    placeholder?: string;
    onChange: (ev: Event | CustomEvent) => void; // Union type for flexibility
  }): TemplateResult {
    const { label, type, value, name, domains, placeholder, onChange } =
      options;

    const inputMap = {
      'entity-picker': html`
        <ha-entity-picker
          .hass=${this.hass}
          .value=${value}
          .includeDomains=${domains}
          @value-changed=${onChange}
        ></ha-entity-picker>
      `,
      'icon-picker': html`
        <ha-icon-picker
          .hass=${this.hass}
          .value=${value}
          @value-changed=${onChange}
        ></ha-icon-picker>
      `,
      text: html`
        <input
          .name=${name ?? ''}
          .value=${value}
          @change=${onChange}
        ></input>
      `,
    };

    return html`
      <div class="config">
        <label>${label}:</label>
        ${inputMap[type]}
      </div>
    `;
  }
}
