import {
  CSSResult,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
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

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-routine-tile',
  name: 'SmartQasa Routine Tile',
  preview: true,
  description:
    'A SmartQasa tile for triggering an automation, scene, or script entity.',
});

@customElement('smartqasa-routine-tile')
export class RoutineTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private running: boolean = false;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:play-circle';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Routine';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    this.entity = ['automation', 'scene', 'script'].includes(
      config.entity?.split('.')[0]
    )
      ? config.entity
      : undefined;
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config') || changedProps.has('running')) return true;

    if (changedProps.has('hass'))
      return (
        (this.entity ? this.hass?.states[this.entity] : undefined) !==
        this.stateObj
      );

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
        <div class="text">
          <div class="name">${this.name}</div>
        </div>
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let icon, iconAnimation, iconColor, name;
    if (this.stateObj) {
      if (this.running) {
        icon = 'hass:rotate-right';
        iconAnimation = 'spin 1.0s linear infinite';
        iconColor = 'var(--sq-blue-rgb)';
      } else {
        icon =
          this.config!.icon ||
          this.stateObj.attributes.icon ||
          'hass:play-circle';
        iconAnimation = 'none';
        iconColor = 'var(--sq-inactive-rgb)';
      }
      name =
        this.config?.name ||
        this.stateObj.attributes.friendly_name ||
        'Routine';
    } else {
      icon = this.config?.icon || 'hass:alert-rhombus';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config?.name || 'Unknown Routine';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
      animation: iconAnimation,
    };
    this.icon = icon;
    this.name = name;
  }

  private runRoutine(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    this.running = true;

    const domain = this.stateObj.entity_id.split('.')[0];
    switch (domain) {
      case 'script':
        callService(this.hass, 'script', 'turn_on', {
          entity_id: this.entity,
        });
        break;
      case 'scene':
        callService(this.hass, 'scene', 'turn_on', {
          entity_id: this.entity,
        });
        break;
      case 'automation':
        callService(this.hass, 'automation', 'trigger', {
          entity_id: this.entity,
        });
        break;
      default:
        console.error('Unsupported entity domain:', domain);
        break;
    }

    setTimeout(() => {
      this.running = false;
    }, 1000);
  }
}
