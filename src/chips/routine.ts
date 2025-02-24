import {
  CSSResultGroup,
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

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  color?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-routine-chip',
  name: 'SmartQasa Routine Chip',
  preview: true,
  description:
    'A SmartQasa chip for triggering an automation, scene, or script entity.',
});

@customElement('smartqasa-routine-chip')
export class RoutineChip extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private running: boolean = false;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:play-circle';
  private iconStyles: Record<string, string> = {};
  private name: string = '';

  static get styles(): CSSResultGroup {
    return [chipBaseStyle, chipTextStyle];
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
    if (changedProps.has('config')) return true;

    if (changedProps.has('hass'))
      return (
        (this.entity ? this.hass?.states[this.entity] : undefined) !==
        this.stateObj
      );

    return false;
  }

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config || !this.entity) return nothing;

    return html`
      <div class="container" @click=${this.runRoutine}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        ${this.name ? html`<div class="text">${this.name}</div>` : null}
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let icon, iconAnimation, iconColor;
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
        iconColor = this.config!.color || 'var(--sq-primary-text-rgb)';
      }
    } else {
      icon = 'hass:alert-rhombus';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
    }

    const name = this.config?.name || '';
    this.iconStyles = {
      color: `rgb(${iconColor})`,
      animation: iconAnimation,
      paddingRight: name
        ? 'calc(var(--sq-chip-padding, 1rem) / 2)'
        : 'var(--sq-chip-padding, 1rem)',
    };
    this.icon = icon;
    this.name = name;
  }

  private runRoutine(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.stateObj) return;

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
        return;
    }

    setTimeout(() => {
      this.running = false;
    }, 2000);
  }
}
