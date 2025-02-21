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
import { styleMap } from 'lit/directives/style-map.js';

import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { callService } from '../utilities/call-service';
import { sequenceTable } from '../tables/pool-light-sequences';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  sequence: string;
  entity: string;
}

@customElement('smartqasa-pool-light-sequencer-tile')
export class PoolLightSequencerTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private running: boolean = false;

  private sequenceObj?: any;
  private stateObj?: HassEntity;
  private entity?: string;
  private icon: string = 'hass:lightbulb';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Light';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public setConfig(config: Config): void {
    this.sequenceObj = config.sequence
      ? sequenceTable[config.sequence]
      : undefined;
    this.entity = ['light', 'switch'].includes(config.entity?.split('.')[0])
      ? config.entity
      : undefined;
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass')) {
      const newState = this.entity ? this.hass?.states[this.entity] : undefined;

      return newState !== this.stateObj;
    }

    return false;
  }

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.runRoutine}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="this.name">${this.name}</div>
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let icon, iconAnimation, iconColor, name;
    if (this.config && this.sequenceObj && this.stateObj) {
      if (this.running) {
        icon = 'hass:rotate-right';
        iconAnimation = 'spin 1.0s linear infinite';
        iconColor = 'var(--sq-blue-rgb-blue)';
      } else {
        icon =
          this.config.icon || this.stateObj.attributes.icon || 'hass:lightbulb';
        iconAnimation = 'none';
        iconColor = this.sequenceObj.iconRGB || 'var(--sq-inactive-rgb)';
      }
      name = this.sequenceObj.name || 'Light';
    } else {
      icon = 'hass:alert-rhombus';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
      animation: iconAnimation,
    };
    this.icon = icon;
    this.name = name;
  }

  private async runRoutine(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.stateObj) return;

    this.running = true;

    await callService(
      this.hass,
      'script',
      'system_color_light_sequence_selector',
      {
        entity: this.entity,
        count: this.sequenceObj.count,
      }
    );

    setTimeout(() => {
      this.running = false;
    }, 2000);
  }
}
