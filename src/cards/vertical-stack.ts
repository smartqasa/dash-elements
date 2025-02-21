import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { createElements } from '../utilities/create-elements';

interface Config extends LovelaceCardConfig {
  cards: LovelaceCardConfig[];
}

window.customCards.push({
  type: 'smartqasa-vertical-stack',
  name: 'SmartQasa Vertical Stack',
  preview: false,
  description:
    'A SmartQasa element that displays other cards in a vertical stack.',
});

@customElement('smartqasa-vertical-stack')
export class VerticalStack extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private cards: LovelaceCard[] = [];

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
      }
      .card {
        height: var(--sq-tile-height);
      }
      .card:not(:last-child) {
        padding-bottom: var(--sq-tile-spacing);
      }
    `;
  }

  public setConfig(config: Config) {
    if (!config) throw new Error('Invalid configuration object');

    if (!Array.isArray(config.cards) || config.cards.length === 0) {
      console.warn('No cards defined in configuration');
      return;
    }

    this.config = config;
  }

  protected willUpdate(changedProps: PropertyValues) {
    if (!this.config || !this.hass) return;

    if (changedProps.has('config')) {
      this.createCards();
    } else if (changedProps.has('hass') && this.cards.length > 0) {
      this.cards.forEach((card) => {
        if (card.hass !== this.hass) card.hass = this.hass;
      });
    }
  }

  protected render() {
    if (!this.config || !this.hass || this.cards.length === 0) return nothing;

    return html`
      <div class="container">
        ${this.cards.map((card) => html`<div class="card">${card}</div>`)}
      </div>
    `;
  }

  private async createCards(): Promise<void> {
    if (!this.config || !this.hass) return;

    if (this.config.cards.length > 0) {
      try {
        this.cards = await createElements(this.config.cards, this.hass);
      } catch (error) {
        this.cards = [];
        console.error('Error creating cards:', error);
      }
    } else {
      this.cards = [];
      console.warn('No cards defined in configuration');
    }
  }
}
