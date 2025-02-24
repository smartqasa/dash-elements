import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';

interface Config extends LovelaceCardConfig {
  entity: string;
  title?: string;
  background?: boolean;
}

@customElement('smartqasa-more-info-card')
export class MoreInfoCard extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 4;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;

  static styles = css`
    .container {
      padding: var(--sq-card-padding);
      border: var(--sq-card-border);
      border-radius: var(--sq-card-border-radius);
      background-color: var(--sq-card-background-color);
    }

    .container-transparent {
      padding: 0;
      border-radius: var(--sq-card-border-radius);
      background-color: transparent;
    }

    .title {
      padding: 0.5rem 0.5rem 1rem 0.5rem;
      text-align: left;
      text-overflow: ellipsis;
      white-space: normal;
      font-weight: 400;
      font-size: var(--sq-primary-font-size);
      color: rgb(var(--sq-primary-font-rgb));
    }
  `;

  public setConfig(config: Config): void {
    this.config = config;
    this.entity = this.config?.entity;
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

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has('hass') && this.hass && this.entity) {
      this.stateObj = this.hass.states[this.entity];
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass || !this.stateObj) return nothing;

    const containerClass = this.config.background
      ? 'container'
      : 'container-transparent';

    return html`
      <div>
        <div class="${containerClass}">
          ${this.config.title
            ? html`<div class="title">${this.config.title}</div>`
            : nothing}
          <more-info-content .hass=${this.hass} .stateObj=${this.stateObj}>
          </more-info-content>
        </div>
      </div>
    `;
  }
}
