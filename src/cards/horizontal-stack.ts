import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { createElements } from '../utilities/create-elements';

interface Config extends LovelaceCardConfig {
  cards: LovelaceCardConfig[];
  justify_right?: boolean;
}

window.customCards.push({
  type: 'smartqasa-horizontal-stack',
  name: 'SmartQasa Horizontal Stack',
  preview: false,
  description:
    'A SmartQasa element that displays other cards in a horizontal stack.',
});

@customElement('smartqasa-horizontal-stack')
export class HorizontalStack extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private cards: LovelaceCard[] = [];
  private justifyRight: boolean = false;

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: flex-start;
        margin-left: calc(var(--sq-chip-margin, 0.4rem) * -1);
      }
      .container.justify-right {
        justify-content: flex-end;
        margin-right: calc(var(--sq-chip-margin, 0.4rem) * -1);
      }
      .element {
        display: flex;
      }
    `;
  }

  public setConfig(config: Config): void {
    if (!config.cards || config.cards.length === 0) return;

    this.config = config;
    this.justifyRight = config.justify_right || false;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (!this.config || !this.hass) return;

    if (changedProps.has('config')) {
      this.createCards();
    } else if (changedProps.has('hass') && this.cards.length > 0) {
      this.cards.forEach((card) => {
        if (card.hass !== this.hass) card.hass = this.hass;
      });
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass || this.cards.length === 0) return nothing;

    const containerClass = this.justifyRight
      ? 'container justify-right'
      : 'container';

    return html`
      <div class="${containerClass}">
        ${this.cards.map(
          (card, index) =>
            html`<div class="element" .key=${index}>${card}</div>`
        )}
      </div>
    `;
  }

  private createCards(): void {
    if (!this.config || !this.hass) return;

    if (this.config.cards.length > 0) {
      this.cards = createElements(this.config.cards, this.hass);
    } else {
      this.cards = [];
    }
  }
}
