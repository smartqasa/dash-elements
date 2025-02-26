import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { deviceType } from '../utilities/device-info';
import { callService } from '../utilities/call-service';
import { moreInfoDialog } from '../dialogs/more-info-dialog';

interface Config extends LovelaceCardConfig {
  entities: string[];
  columns?: number;
  style?: 'circle' | 'square';
}

window.customCards.push({
  type: 'smartqasa-light-grid-card',
  name: 'SmartQasa Light Grid Card',
  preview: false,
  description:
    'A SmartQasa card that displays a series of light entities in a configurable grid.',
});

@customElement('smartqasa-light-grid-card')
export class LightGridCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private columns = 2;
  private buttonStyle: 'circle' | 'square' = 'circle';
  private entities: string[] = [];

  static get styles() {
    return css`
      .container {
        display: grid;
        gap: 2.5rem;
        justify-content: center;
      }
      .button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2.5rem;
        box-sizing: border-box;
        cursor: pointer;
      }
      .icon {
        width: var(--sq-icon-size);
        height: var(--sq-icon-size);
      }
      .circle {
        border-radius: 50%;
      }
      .square {
        border-radius: 1rem;
      }
      .blank {
        width: calc(var(--sq-icon-size) + (2.5rem * 2));
        height: calc(var(--sq-icon-size) + (2.5rem * 2));
        background: transparent;
      }
    `;
  }

  public getCardSize(): number {
    return this.entities.length || 1;
  }

  public setConfig(config: Config): void {
    if (!config.entities || config.entities.length === 0) {
      throw new Error('No entities listed.');
    }
    this.entities = config.entities;
    this.columns = config.columns ?? 2;
    this.buttonStyle = config.style ?? 'circle';
    this.config = config;
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.hass) return nothing;

    const gridStyle = {
      'grid-template-columns':
        deviceType === 'phone'
          ? '1fr 1fr'
          : `repeat(${this.columns}, min-content)`,
    };

    return html`
      <div class="container" style=${styleMap(gridStyle)}>
        ${this.entities.map((entity) => this.renderButton(entity))}
      </div>
    `;
  }

  private renderButton(entity: string): TemplateResult | typeof nothing {
    if (entity.startsWith('blank')) {
      const blankCount = this.getBlankCount(entity);
      return html`${Array(blankCount)
        .fill(0)
        .map(() => html`<div class="blank"></div>`)}`;
    }

    const stateObj = this.hass?.states[entity];
    if (!stateObj) return nothing;

    const color = this.getLightColor(stateObj);
    const buttonStyle = {
      'background-color': `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`,
      'border-radius': this.buttonStyle === 'square' ? '1rem' : '50%',
    };

    const iconStyle = {
      color: `rgb(${color.r}, ${color.g}, ${color.b})`,
    };

    return html`
      <div
        class="button ${this.style}"
        style=${styleMap(buttonStyle)}
        @click=${(e: Event) => this.showMoreInfo(e, entity)}
        @contextmenu=${(e: Event) => this.toggleEntity(e, entity)}
      >
        <ha-icon
          class="icon"
          style=${styleMap(iconStyle)}
          icon=${stateObj.attributes.icon || 'hass:lightbulb'}
        ></ha-icon>
      </div>
    `;
  }

  private getBlankCount(entity: string): number {
    const match = entity.match(/blank\.(\d+)/);
    return match ? parseInt(match[1], 10) : 1;
  }

  private getLightColor(stateObj: any): { r: number; g: number; b: number } {
    if (stateObj.attributes.rgb_color) {
      const [r, g, b] = stateObj.attributes.rgb_color;
      return { r, g, b };
    }
    return { r: 255, g: 255, b: 255 };
  }

  private showMoreInfo(e: Event, entity: string): void {
    e.stopPropagation();
    if (!this.hass || !this.entities.length) return;

    const stateObj = this.hass?.states[entity];
    if (!stateObj) return;

    const callingDialogConfig = {
      title: this.config!.title,
      timeout: 120000,
      content: {
        type: 'custom:smartqasa-light-grid-card',
        title: this.config?.title || 'Light Group',
        entities: this.entities,
        columns: this.columns,
        style: this.style,
      },
    };

    moreInfoDialog(stateObj, callingDialogConfig);
  }

  private async toggleEntity(e: Event, entity: string): Promise<void> {
    e.stopPropagation();
    if (!this.hass) return;

    const stateObj = this.hass.states[entity];
    if (!stateObj) return;

    const state = this.hass?.states[entity].state || 'unknown';

    const domain = 'light';
    const service = state === 'on' ? 'turn_off' : 'turn_on';
    const data = state === 'on' ? { transition: 2 } : undefined;
    const target = { entity_id: entity };

    await callService(this.hass, domain, service, data, target);
  }
}
