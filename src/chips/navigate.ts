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

import { navigateToArea } from '../utilities/navigate-to-area';
import {
  HassArea,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';

import chipDoubleStyle from '../css/chip-double.css';

interface Config extends LovelaceCardConfig {
  area_prev?: string;
  area_next?: string;
}
window.customCards.push({
  type: 'smartqasa-navigate-chip',
  name: 'SmartQasa Navigate Chip',
  preview: true,
  description: 'A SmartQasa chip for navigating to a previous/next area.',
});

@customElement('smartqasa-navigate-chip')
export class NavigateChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _areaPrev?: string;
  @state() private _areaNext?: string;
  @state() private _areaObjPrev?: HassArea;
  @state() private _areaObjNext?: HassArea;

  static styles: CSSResult = unsafeCSS(chipDoubleStyle);

  public setConfig(config: Config): void {
    this._areaPrev = config.area_prev || undefined;
    this._areaNext = config.area_next || undefined;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      changedProps.has('hass') &&
      this._areaPrev &&
      this._areaNext &&
      (this.hass?.areas[this._areaPrev] !== this._areaObjPrev ||
        this.hass?.areas[this._areaNext] !== this._areaObjNext)
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this._areaPrev || !this._areaNext) return nothing;

    this._areaObjPrev = this._areaPrev
      ? this.hass?.areas[this._areaPrev]
      : undefined;
    this._areaObjNext = this._areaNext
      ? this.hass?.areas[this._areaNext]
      : undefined;

    const iconPrev = 'hass:menu-left';
    const iconNext = 'hass:menu-right';

    return html`
      <div class="container">
        <div class="icon1" @click=${this._navigatePrev}>
          <ha-icon icon=${iconPrev}></ha-icon>
        </div>
        <div class="icon2" @click=${this._navigateNext}>
          <ha-icon icon=${iconNext}></ha-icon>
        </div>
      </div>
    `;
  }

  private _navigatePrev(e: Event): void {
    e.stopPropagation();
    if (this._areaPrev && this._areaObjPrev) {
      navigateToArea(this._areaPrev);
    } else {
      console.error('Previous area is not found.');
    }
  }

  private _navigateNext(e: Event): void {
    e.stopPropagation();
    if (this._areaNext && this._areaObjNext) {
      navigateToArea(this._areaNext);
    } else {
      console.error('Next area is not found.');
    }
  }
}
