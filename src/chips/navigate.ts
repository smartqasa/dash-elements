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
  @state() private areaPrev?: string;
  @state() private areaNext?: string;
  @state() private areaObjPrev?: HassArea;
  @state() private areaObjNext?: HassArea;

  static styles: CSSResult = unsafeCSS(chipDoubleStyle);

  public setConfig(config: Config): void {
    this.areaPrev = config.area_prev || undefined;
    this.areaNext = config.area_next || undefined;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(
      changedProps.has('hass') &&
      this.areaPrev &&
      this.areaNext &&
      (this.hass?.areas[this.areaPrev] !== this.areaObjPrev ||
        this.hass?.areas[this.areaNext] !== this.areaObjNext)
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.areaPrev || !this.areaNext) return nothing;

    this.areaObjPrev = this.areaPrev
      ? this.hass?.areas[this.areaPrev]
      : undefined;
    this.areaObjNext = this.areaNext
      ? this.hass?.areas[this.areaNext]
      : undefined;

    const iconPrev = 'hass:menu-left';
    const iconNext = 'hass:menu-right';

    return html`
      <div class="container">
        <div class="icon1" @click=${this.navigatePrev}>
          <ha-icon icon=${iconPrev}></ha-icon>
        </div>
        <div class="icon2" @click=${this.navigateNext}>
          <ha-icon icon=${iconNext}></ha-icon>
        </div>
      </div>
    `;
  }

  private navigatePrev(e: Event): void {
    e.stopPropagation();
    if (this.areaPrev && this.areaObjPrev) {
      navigateToArea(this.areaPrev);
    } else {
      console.error('Previous area is not found.');
    }
  }

  private navigateNext(e: Event): void {
    e.stopPropagation();
    if (this.areaNext && this.areaObjNext) {
      navigateToArea(this.areaNext);
    } else {
      console.error('Next area is not found.');
    }
  }
}
