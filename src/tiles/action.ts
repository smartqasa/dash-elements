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

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { callService } from '../utilities/call-service';

import tileStyle from '../css/tile.css';

interface ActionConfig {
  action: string;
  data?: Record<string, any>;
}

interface Config extends LovelaceCardConfig {
  icon: string;
  name: string;
  actions: ActionConfig[];
}

window.customCards.push({
  type: 'smartqasa-action-tile',
  name: 'SmartQasa Action Tile',
  preview: true,
  description:
    'A SmartQasa tile for executing multiple Home Assistant actions.',
});

@customElement('smartqasa-action-tile')
export class ActionTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private running: boolean = false;

  private actions: ActionConfig[] = [];
  private icon: string = 'hass:alert-rhombus';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Action';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    this.config = config;
    this.actions = config.actions || [];
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    return !!(changedProps.has('config') || changedProps.has('running'));
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.config) return nothing;

    return html`
      <div class="container" @click=${this.runActions}>
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
    let iconAnimation, iconColor;

    if (this.config) {
      if (this.running) {
        this.icon = 'hass:rotate-right';
        iconAnimation = 'spin 1.0s linear infinite';
        iconColor = 'var(--sq-blue-rgb)';
      } else {
        this.icon = this.config.icon || 'hass:help-rhombus';
        iconAnimation = 'none';
        iconColor = 'var(--sq-inactive-rgb)';
      }
      this.name = this.config.name || 'Action Tile';
    } else {
      this.icon = 'hass:alert-rhombus';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      this.name = 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha, 0.2))`,
      animation: iconAnimation,
    };
  }

  private async runActions(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.config?.actions) return;

    this.running = true;

    for (const action of this.config.actions) {
      const [domain, service] = action.action.split('.');
      await callService(this.hass, domain, service, action.data || {});
    }

    setTimeout(() => {
      this.running = false;
    }, 1000);
  }
}
