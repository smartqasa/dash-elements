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
  HassArea,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { callService } from '../utilities/call-service';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  area: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-all-off-tile',
  name: 'SmartQasa All Off Tile',
  preview: true,
  description:
    'A SmartQasa tile for turning off all light and fan entities in an area.',
});

@customElement('smartqasa-all-off-tile')
export class AllOffTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private running: boolean = false;

  private area?: string;
  private areaObj?: HassArea;
  private icon: string = 'hass:alert-rhombus';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Area';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public setConfig(config: Config): void {
    this.config = config;
    this.area = config.area;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      changedProps.has('running') ||
      (changedProps.has('hass') &&
        this.area &&
        this.hass?.areas[this.area] !== this.areaObj) ||
      changedProps.has('config')
    );
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.area) return nothing;

    return html`
      <div class="container" @click=${this.runRoutine}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this.name}</div>
        </div>
      </div>
    `;
  }

  private updateState(): void {
    this.areaObj = this.area ? this.hass?.areas[this.area] : undefined;

    let icon, iconAnimation, iconColor, name;
    if (this.config && this.areaObj) {
      if (this.running) {
        icon = 'hass:rotate-right';
        iconAnimation = 'spin 1.0s linear infinite';
        iconColor = 'var(--sq-blue-rgb)';
      } else {
        icon = this.config.icon || 'hass:power';
        iconAnimation = 'none';
        iconColor = 'var(--sq-inactive-rgb)';
      }
      name = this.config.name || this.areaObj.name || 'All Off';
    } else {
      icon = 'hass:alert-rhombus';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = 'Unknown Area';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha, 0.2))`,
      animation: iconAnimation,
    };
    this.icon = icon;
    this.name = name;
  }

  private async runRoutine(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.areaObj) return;

    this.running = true;

    await callService(this.hass, 'light', 'turn_off', {
      area_id: this.area,
      transition: 2,
    });
    await callService(this.hass, 'fan', 'turn_off', {
      area_id: this.area,
    });

    setTimeout(() => {
      this.running = false;
    }, 1000);
  }
}
