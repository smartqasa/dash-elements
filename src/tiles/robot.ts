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
  type: 'smartqasa-robot-tile',
  name: 'SmartQasa Robot Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a robot vacuum entity.',
});

@customElement('smartqasa-robot-tile')
export class RobotTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private stateObj?: HassEntity;

  private entity?: string;
  private icon: string = 'hass:robot-vacuum-variant';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Robot';
  private stateFmtd: string = 'Unknown State';

  private readonly stateMap: Record<
    string,
    { stateIcon: string; stateAnimation: string; stateColor: string }
  > = {
    cleaning: {
      stateIcon: 'hass:robot-vacuum-variant',
      stateAnimation: 'none',
      stateColor: 'var(--sq-vacuum-cleaning-rgb, 0, 150, 136)',
    },
    docked: {
      stateIcon: 'hass:robot-vacuum-variant',
      stateAnimation: 'none',
      stateColor: 'var(--sq-inactive-rgb)',
    },
    idle: {
      stateIcon: 'hass:robot-vacuum-variant',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-vacuum-idle-rgb, 190, 75, 85)',
    },
    paused: {
      stateIcon: 'hass:robot-vacuum-variant',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-vacuum-paused-rgb, 190, 75, 85)',
    },
    returning: {
      stateIcon: 'hass:robot-vacuum-variant',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-vacuum-returning-rgb, 0, 150, 136)',
    },
    default: {
      stateIcon: 'hass:robot-vacuum-variant-alert',
      stateAnimation: 'none',
      stateColor: 'var(--sq-unavailable-rgb, 255, 0, 255)',
    },
  };

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('vacuum.')) {
      console.error('Invalid vacuum entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
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

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.toggleEntity}>
        <div
          class="icon"
          @click=${this.showMoreInfo}
          style="${styleMap(this.iconStyles)}"
        >
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="name">${this.name}</div>
        <div class="state">${this.stateFmtd}</div>
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
      icon = this.config!.icon || stateIcon || 'hass:vacuum-variant';
      iconAnimation = stateAnimation;
      iconColor = stateColor;
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Robot';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config?.icon || 'hass:robot-vacuum-variant-alert';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config?.name || 'Unknown';
      stateFmtd = 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha, 0.2))`,
      animation: iconAnimation,
    };
    this.icon = icon;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private toggleEntity(e: Event): void {
    e.stopPropagation();
    const state = this.stateObj?.state || 'unknown';
    const service = ['docked', 'idle', 'paused'].includes(state)
      ? 'start'
      : 'pause';
    callService(this.hass, 'vacuum', service, {
      entity_id: this.entity,
    });
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
