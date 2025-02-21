import { css, html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { HassArea, HomeAssistant, LovelaceCard } from '../types';
import { getDeviceType, getDeviceOrientation } from '../utilities/device-info';
import { createElement } from '../utilities/create-element';

@customElement('smartqasa-areas-card')
export class AreasCard extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 4;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private areaTiles: LovelaceCard[] = [];
  @state() private gridStyle = {};

  private boundHandleDeviceChanges: () => void;

  public setConfig(): void {}

  static get styles() {
    return css`
      :host {
        border: none;
        background-color: transparent;
        box-sizing: border-box;
      }
      .container {
        display: grid;
        grid-auto-rows: var(--sq-tile-height, 7rem);
        gap: var(--sq-tile-spacing, 0.8rem);
        overflow-y: auto;
      }
      .tile {
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.boundHandleDeviceChanges = this.handleDeviceChanges.bind(this);
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.handleDeviceChanges();

    window.addEventListener('resize', this.boundHandleDeviceChanges);
    window.addEventListener('orientationchange', this.boundHandleDeviceChanges);

    this.loadAreaTiles();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    window.removeEventListener('resize', this.boundHandleDeviceChanges);
    window.removeEventListener(
      'orientationchange',
      this.boundHandleDeviceChanges
    );
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    if (changedProps.has('hass') && this.hass) {
      this.areaTiles.forEach((tile) => {
        tile.hass = this.hass;
      });
    }
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" style=${styleMap(this.gridStyle)}>
        ${this.areaTiles.map((tile) => html`<div class="tile">${tile}</div>`)}
      </div>
    `;
  }

  private handleDeviceChanges(): void {
    const type = getDeviceType();
    const orientation = getDeviceOrientation();

    if (type === 'phone') {
      this.gridStyle = {
        gridTemplateColumns: orientation === 'landscape' ? '1fr 1fr' : '1fr',
      };
    } else {
      this.gridStyle = {
        gridTemplateColumns: 'repeat(3, var(--sq-tile-width, 19.5rem))',
      };
    }
  }

  private loadAreaTiles(): void {
    if (!this.hass || !this.hass.areas) {
      this.areaTiles = [];
      return;
    }

    const visibleAreas = Object.values<HassArea>(this.hass.areas).filter(
      (area) => area?.labels?.includes('visible')
    );

    if (visibleAreas.length === 0) {
      this.areaTiles = [];
      return;
    }

    this.areaTiles = visibleAreas.map((area) => {
      const tile = createElement({
        type: 'custom:smartqasa-area-tile',
        area: area.area_id,
      }) as LovelaceCard;

      tile.hass = this.hass;
      return tile;
    });
  }
}
