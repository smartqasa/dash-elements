import {
  CSSResult,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  HassArea,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { navigateToArea } from '../utilities/navigate-to-area';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  area: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-area-tile',
  name: 'SmartQasa Area Tile',
  preview: true,
  description: 'A SmartQasa card for navigating to an area panel.',
});

@customElement('smartqasa-area-tile')
export class AreaTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private area?: string;
  private areaObj?: HassArea;
  private icon: string = 'hass:alert-rhombus';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Area';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    this.config = config;
    this.area = this.config.area;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      (changedProps.has('hass') &&
        this.area &&
        this.hass?.areas[this.area] !== this.areaObj) ||
      (changedProps.has('config') && this.config)
    );
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    this.updateState();
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this.navigateToArea}>
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

    let iconColor;
    if (this.config && this.areaObj) {
      this.icon = this.config.icon || this.areaObj.icon || 'hass:help-rhombus';
      iconColor = 'var(--sq-inactive-rgb)';

      this.name = this.config.name || this.areaObj.name || 'Area';
    } else {
      this.icon = 'hass:alert-rhombus';
      iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
      this.name = 'Unknown Area';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
  }

  private navigateToArea(e: Event): void {
    e.stopPropagation();
    if (!this.area) return;
    navigateToArea(this.area);
    window.browser_mod?.service('close_popup', {});
  }
}
