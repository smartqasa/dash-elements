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
  @state() protected config?: Config;
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
      name = this.config?.name || 'Unknown Switch';
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

  private toggleEntity(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    callService(this.hass, 'homeassistant', 'toggle', {
      entity_id: this.entity,
    });
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();

    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
