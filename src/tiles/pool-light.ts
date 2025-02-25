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
import { sequenceTable } from '../tables/pool-light-sequences';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-pool-light-tile',
  name: 'SmartQasa Pool Light Tile',
  preview: true,
  description:
    'A SmartQasa tile for controlling a pool color light or switch entity.',
});

@customElement('smartqasa-pool-light-tile')
export class PoolLightTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private stateObj?: HassEntity;

  private entity?: string;
  private icon: string = 'hass:lightbulb';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Light';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    this.entity = ['light', 'switch'].includes(config.entity?.split('.')[0])
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
          @click=${this.showColorList}
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
      const state = this.stateObj.state || 'unknown';
      icon =
        this.config!.icon || this.stateObj.attributes.icon || 'hass:lightbulb';
      iconColor =
        state === 'on' ? 'var(--sq-light-on-rgb)' : 'var(--sq-inactive-rgb)';
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Light';
      stateFmtd =
        this.hass!.formatEntityState(this.stateObj) +
        (state === 'on' && this.stateObj.attributes.brightness
          ? ' - ' +
            this.hass!.formatEntityAttributeValue(this.stateObj, 'brightness')
          : '');
    } else {
      icon = this.config!.icon || 'hass:lightbulb-alert';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config!.name || 'Unknown';
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

  private async toggleEntity(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    const domain = this.entity.split('.')[0];
    const service = 'toggle';
    const data = undefined;
    const target = { entity_id: this.entity };
    await callService(this.hass, domain, service, data, target);
  }

  private showColorList(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    const cards = Object.keys(sequenceTable).map((key) => ({
      type: 'custom:smartqasa-pool-light-sequencer-tile',
      entity: this.entity,
      sequence: key,
    }));
    const dialogConfig = {
      title: this.stateObj.attributes.friendly_name || this.stateObj.entity_id,
      timeout: 60000,
      content: {
        type: 'custom:smartqasa-grid-stack',
        columns: 3,
        cards: cards,
      },
    };

    window.browser_mod?.service('popup', dialogConfig);
  }
}
