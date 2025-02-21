import {
  css,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
  nothing,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { createElement } from '../utilities/create-element';

interface Config extends LovelaceCardConfig {
  entity?: string;
}

window.customCards.push({
  type: 'smartqasa-sonos-card',
  name: 'SmartQasa Sonos Card',
  preview: true,
  description: 'A SmartQasa element that display a set of Sonos cards.',
});

@customElement('smartqasa-sonos-card')
export class SonosPanelCard extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 10;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;

  private speakersCard?: LovelaceCard;
  private playerCard?: LovelaceCard;
  private mediaCard?: LovelaceCard;

  static get styles() {
    return css`
      .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--sq-card-spacing);
      }
      .card {
        display: block;
      }
    `;
  }

  public setConfig(config: Config): void {
    this.config = config;

    if (this.config.entity) {
      this.entity = this.config.entity.startsWith('media_player.')
        ? this.config.entity
        : 'undefined';
    }
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has('hass') && this.hass) {
      [this.speakersCard, this.playerCard, this.mediaCard].forEach((card) => {
        if (card) card.hass = this.hass;
      });
    }
  }

  protected render(): TemplateResult {
    const renderCard = (
      card: LovelaceCard | undefined
    ): TemplateResult | typeof nothing => {
      if (!card) return nothing;
      const element = card as unknown as HTMLElement;
      return html`<div class="card">${element}</div>`;
    };

    return html`
      <div class="container">
        ${renderCard(this.speakersCard)} ${renderCard(this.playerCard)}
        ${renderCard(this.mediaCard)}
      </div>
    `;
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);

    this.speakersCard = createElement(
      {
        type: 'custom:maxi-media-player',
        entityId: this.entity,
        heightPercentage: '75',
        showVolumeUpAndDownButtons: true,
        sections: '["volumes", "groups", "grouping"]',
      },
      this.hass
    );

    this.playerCard = createElement(
      {
        type: 'custom:maxi-media-player',
        entityId: this.entity,
        heightPercentage: '75',
        showVolumeUpAndDownButtons: true,
        sections: '["player"]',
      },
      this.hass
    );

    this.mediaCard = createElement(
      {
        type: 'custom:maxi-media-player',
        heightPercentage: '75',
        mediaBrowserItemsPerRow: 3,
        mediaBrowserShowTitleForThumbnailIcons: true,
        showVolumeUpAndDownButtons: true,
        sections: '["media browser"]',
      },
      this.hass
    );
  }
}
