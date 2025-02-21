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
import { styleMap } from 'lit/directives/style-map.js';

import {
  DialogObj,
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { formatState } from '../utilities/format-state';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  dialog_file: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-custom-tile',
  name: 'SmartQasa custom Tile',
  preview: true,
  description: 'A SmartQasa tile for displaying a custom dialog.',
});

@customElement('smartqasa-custom-tile')
export class DialogTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 2;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected _config?: Config;
  @state() private _dialogObj?: DialogObj;
  @state() private _stateObj?: HassEntity;

  private _entity?: string;
  private _icon: string = 'mdi:help-circle';
  private _iconStyles: Record<string, string> = {};
  private _name: string = 'Unknown Dialog';
  private _stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public async setConfig(config: Config): Promise<void> {
    if (!config.dialog_file) {
      console.error('dialog_file must be provided in the config.');
      return;
    }

    try {
      const path = `/local/smartqasa/custom/dialogs/${config.dialog_file}`;
      this._dialogObj = (await loadYamlAsJson(path)) as DialogObj;
      this._entity = this._dialogObj.entity;
    } catch (error) {
      console.error('Failed to load YAML:', error);
    } finally {
      if (this._dialogObj) {
        this._icon = config.icon || this._dialogObj.icon || 'mdi:help-circle';
        this._name = config.name || this._dialogObj.name || 'Unknown';
      }
    }

    this._config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('_config')) return true;

    if (changedProps.has('hass') && this._entity) {
      const newState = this.hass?.states[this._entity];
      return newState !== this._stateObj;
    }

    return false;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    this._updateState();
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this._showDialog}>
        <div class="icon" style="${styleMap(this._iconStyles)}">
          <ha-icon icon=${this._icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this._name}</div>
          ${this._stateFmtd
            ? html`<div class="state">${this._stateFmtd}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _updateState(): void {
    let iconColor, stateFmtd;

    if (this._entity) {
      this._stateObj = this.hass?.states[this._entity];

      if (this._stateObj) {
        const state = this._stateObj.state || 'unknown';
        iconColor =
          state === 'on'
            ? (this._config?.dialog?.active_color ??
              this._config?.active_color ??
              'var(--sq-orange-rgb)')
            : 'var(--sq-inactive-rgb)';
        stateFmtd = formatState(this.hass!, this._entity);
      } else {
        iconColor = 'var(--sq-unavailable-rgb)';
        stateFmtd = 'Unknown State';
      }
    } else {
      iconColor = 'var(--sq-inactive-rgb)';
      stateFmtd = '';
    }

    this._iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this._stateFmtd = stateFmtd;
  }

  private _showDialog(e: Event): void {
    e.stopPropagation();
    const dialogObj = this._dialogObj;
    if (dialogObj?.data) window.browser_mod?.service('popup', dialogObj.data);
  }
}
