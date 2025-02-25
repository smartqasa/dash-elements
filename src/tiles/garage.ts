import {
  CSSResult,
  html,
  LitElement,
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
  type: 'smartqasa-garage-tile',
  name: 'SmartQasa Garage Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a garage cover entity.',
});

@customElement('smartqasa-garage-tile')
export class GarageTile extends LitElement implements LovelaceCard {
  getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private stateObj?: HassEntity;

  private entity?: string;
  private icon: string = 'hass:garage-alert-variant';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Garage';
  private stateFmtd: string = 'Unknown State';

  private readonly stateMap: Record<
    string,
    { stateIcon: string; stateAnimation: string; stateColor: string }
  > = {
    closed: {
      stateIcon: 'hass:garage-variant',
      stateAnimation: 'none',
      stateColor: 'var(--sq-inactive-rgb)',
    },
    closing: {
      stateIcon: 'hass:arrow-down-box',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-cover-garage-closing-rgb)',
    },
    opening: {
      stateIcon: 'hass:arrow-up-box',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-cover-garage-opening-rgb)',
    },
    open: {
      stateIcon: 'hass:garage-open-variant',
      stateAnimation: 'none',
      stateColor: 'var(--sq-cover-garage-open-rgb)',
    },
    default: {
      stateIcon: 'hass:garage-alert-variant',
      stateAnimation: 'none',
      stateColor: 'var(--sq-unavailable-rgb)',
    },
  };

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('cover.')) {
      console.error('Invalid cover entity provided in the config.');
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

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this.toggleEntity}>
        <div
          class="icon"
          @click=${this.showMoreInfo}
          style="${styleMap(this.iconStyles)}"
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
      icon = this.config!.icon || stateIcon;
      iconAnimation = stateAnimation;
      iconColor = stateColor;
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Garage';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config!.icon || 'hass:garage-alert-variant';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
      name = this.config?.name || 'Unknown';
      stateFmtd = 'Unknown';
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

  private async toggleEntity(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.hass || !this.entity || !this.stateObj) return;

    const domain = 'cover';
    const service = 'toggle';
    const data = undefined;
    const target = { entity_id: this.entity };
    await callService(this.hass, domain, service, data, target);
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }
}
