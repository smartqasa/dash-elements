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
import { moreInfoDialog } from '../dialogs/more-info-dialog';
import { formatState } from '../utilities/format-state';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-lock-tile',
  name: 'SmartQasa Lock Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a lock entity.',
});

@customElement('smartqasa-lock-tile')
export class LockTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private stateObj?: HassEntity;
  @state() private running: boolean = false;

  private entity?: string;
  private icon: string = 'hass:lock-alert';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Lock';
  private stateFmtd: string = 'Unknown State';

  private readonly stateMap: Record<
    string,
    { stateIcon: string; stateAnimation: string; stateColor: string }
  > = {
    locked: {
      stateIcon: 'hass:lock',
      stateAnimation: 'none',
      stateColor: 'var(--sq-inactive-rgb)',
    },
    unlocking: {
      stateIcon: 'hass:rotate-right',
      stateAnimation: 'spin 1.0s linear infinite',
      stateColor: 'var(--sq-lock-unlocking-rgb)',
    },
    unlocked: {
      stateIcon: 'hass:lock-open',
      stateAnimation: 'none',
      stateColor: 'var(--sq-lock-unlocked-rgb)',
    },
    locking: {
      stateIcon: 'hass:rotate-right',
      stateAnimation: 'spin 1.0s linear infinite',
      stateColor: 'var(--sq-lock-locking-rgb)',
    },
    jammed: {
      stateIcon: 'hass:lock-open',
      stateAnimation: 'blink 1.0s linear infinite',
      stateColor: 'var(--sq-lock-jammed-rgb, 255, 0, 0)',
    },
    default: {
      stateIcon: 'hass:lock-alert',
      stateAnimation: 'none',
      stateColor: 'var(--sq-unavailable-rgb)',
    },
  };

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('lock.')) {
      console.error('Invalid lock entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
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

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.toggleEntity}>
        <div
          class="icon"
          @click=${this.showMoreInfo}
          style=${styleMap(this.iconStyles)}
        >
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this.name}</div>
          <div class="state">${this.stateFmtd}</div>
        </div>
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let icon, iconAnimation, iconColor, name, stateFmtd;
    if (this.stateObj) {
      const state = this.stateObj.state || 'unknown';
      const { stateIcon, stateAnimation, stateColor } =
        this.stateMap[state] || this.stateMap.default;
      icon = this.config!.icon || stateIcon || 'hass:lock-variant';
      iconAnimation = stateAnimation;
      iconColor = stateColor;
      name =
        this.config?.name || this.stateObj.attributes.friendly_name || 'Lock';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config!.icon || 'hass:lock-alert-variant';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config!.name || 'Unknown Lock';
      stateFmtd = 'Unknown State';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
      animation: iconAnimation,
    };
    this.icon = icon;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private toggleEntity(e: Event): void {
    e.stopPropagation();
    if (!this.stateObj) return;

    const state = this.stateObj.state;
    this.running = true;
    this.stateObj.state = state == 'locked' ? 'unlocking' : 'locking';
    callService(this.hass, 'lock', state == 'locked' ? 'unlock' : 'lock', {
      entity_id: this.entity,
    });

    setTimeout(() => {
      this.running = false;
    }, 500);
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
