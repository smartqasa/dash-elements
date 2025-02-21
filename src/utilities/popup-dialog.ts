import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { createElement } from './create-element';
import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';

export interface PopupData {
  title?: string;
  size?: 'normal' | 'fullscreen';
  timeout?: number;
  card?: LovelaceCardConfig;
}

@customElement('smartqasa-popup-dialog')
export class PopupDialog extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: String }) public title = '';
  @property({ type: String }) public size: 'normal' | 'fullscreen' = 'normal';
  @property({ type: Number }) public timeout = 0;
  @property({ type: Object }) public card?: LovelaceCardConfig;

  @state() private cardElement: LovelaceCard | undefined;
  @state() private progressBarAnimation: string = '';

  @query('.progress-bar > div') private progressBar!: HTMLElement;

  private timeoutId: number | undefined;

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .popup-container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      width: var(--popup-width, 300px);
      max-width: 90vw;
      padding: 20px;
      position: relative;
      transition: all 0.3s ease;
    }

    .popup-container.fullscreen {
      width: 100vw;
      height: 100vh;
    }

    .progress-bar {
      width: 100%;
      height: 5px;
      background-color: lightgray;
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }

    .progress-bar div {
      height: 100%;
      background-color: #3b82f6;
      animation: var(--progress-animation, none);
    }

    .title {
      text-align: left;
      font-size: 1.5em;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.2em;
      cursor: pointer;
    }
  `;

  protected firstUpdated() {
    this.cardElement = this.card ? createElement(this.card) : undefined;
    console.log('First', this.card, this.cardElement);
    if (this.cardElement) this.cardElement.hass = this.hass;
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('timeout')) {
      this.handleTimeout();
    }

    if (changedProps.has('hass') && this.cardElement) {
      this.cardElement.hass = this.hass;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  protected render() {
    return html`
      <div class="popup-container ${this.size}">
        ${this.timeout > 0
          ? html`<div class="progress-bar">
              <div
                style="--progress-animation: ${this.progressBarAnimation}"
              ></div>
            </div>`
          : ''}
        <button class="close-btn" @click=${this.closePopup}>X</button>
        <div class="title">${this.title}</div>
        <div class="content">
          ${this.cardElement ? html`${this.cardElement}` : html`<slot></slot>`}
        </div>
      </div>
    `;
  }

  private handleTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.timeout > 0) {
      this.timeoutId = window.setTimeout(
        () => this.closePopup(),
        this.timeout * 1000
      );
      this.progressBarAnimation = `progress ${this.timeout}s linear forwards`;
    }
  }

  public closePopup() {
    this.dispatchEvent(
      new CustomEvent('smartqasa-popup-close', {
        bubbles: true,
        composed: true,
      })
    );
  }
}
