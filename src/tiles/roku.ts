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
import { listDialogConfig } from '../dialogs/list-dialog-config';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-roku-tile',
  name: 'SmartQasa Roku Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a Roku media_player entity.',
});

@customElement('smartqasa-roku-tile')
export class RokuTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:audio-video';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Roku';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return unsafeCSS(tileStyle);
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('media_player.')) {
      console.error('Invalid media_player entity provided in the config.');
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

  protected willUpdate(changedProps: PropertyValues): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.showMoreInfo}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
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

    let icon, iconColor, name, stateFmtd;
    if (this.stateObj) {
      icon =
        this.config?.icon ||
        this.stateObj.attributes.icon ||
        'hass:audio-video';
      const state = this.stateObj.state || 'unknown';
      switch (state) {
        case 'idle':
          iconColor = 'var(--sq-media_player-idle-rgb)';
          break;
        case 'standby':
          iconColor = 'var(--sq-media_player-standby-rgb)';
          break;
        case 'on':
          iconColor = 'var(--sq-media_player-on-rgb)';
          break;
        case 'paused':
          iconColor = 'var(--sq-media_player-paused-rgb)';
          break;
        case 'playing':
          iconColor = 'var(--sq-media_player-playing-rgb, 3, 169, 244)';
          break;
        default:
          iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
          break;
      }
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Roku';
      stateFmtd = `${this.hass!.formatEntityState(this.stateObj)}${
        this.stateObj.attributes?.source
          ? ` - ${this.stateObj.attributes.source}`
          : ''
      }`;
    } else {
      icon = this.config!.icon || 'hass:audio-video-off';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config!.name || 'Unknown';
      stateFmtd = 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this.icon = icon;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private toggleEntity(e: Event): void {
    e.stopPropagation();
    callService(this.hass, 'media_player', 'toggle', {
      entity_id: this.entity,
    });
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    if (!this.config || !this.stateObj) return;

    const dialogConfig = {
      title:
        this.stateObj.attributes?.friendly_name || this.entity || 'Unknown',
      timeout: 60000,
      content: {
        type: 'custom:smartqasa-tv-remote-card',
        entity: this.entity,
      },
      ...(this.config.dialog_title && {
        dismiss_action: {
          service: 'browser_mod.popup',
          data: {
            ...listDialogConfig(
              this.config.dialog_title,
              this.config.filter_type,
              this.config.filter_value,
              this.config.tile_type
            ),
          },
        },
      }),
    };

    window.browser_mod?.service('popup', dialogConfig);
  }
}
