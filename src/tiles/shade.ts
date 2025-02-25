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
import { entityListDialog } from '../dialogs/entity-list-dialog';
import { formatState } from '../utilities/format-state';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity?: string;
  name?: string;
  tilt?: number;
}

window.customCards.push({
  type: 'smartqasa-shade-tile',
  name: 'SmartQasa Shade Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a window shade entity.',
});

@customElement('smartqasa-shade-tile')
export class ShadeTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;
  private tilt?: number;
  private stateObj?: HassEntity;
  private icon: string = 'hass:roller-shade';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Shade';
  private stateFmtd: string = 'Unknown State';

  private readonly stateMap: Record<
    string,
    { stateIcon: string; stateAnimation: string; stateColor: string }
  > = {
    closed: {
      stateIcon: 'hass:roller-shade-closed',
      stateAnimation: 'none',
      stateColor: 'var(--sq-inactive-rgb)',
    },
    closing: {
      stateIcon: 'hass:arrow-down-box',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-cover-shade-closing-rgb)',
    },
    opening: {
      stateIcon: 'hass:arrow-up-box',
      stateAnimation: 'blink 2.0s linear infinite',
      stateColor: 'var(--sq-cover-shade-opening-rgb)',
    },
    open: {
      stateIcon: 'hass:roller-shade',
      stateAnimation: 'none',
      stateColor: 'var(--sq-cover-shade-open-rgb)',
    },
    default: {
      stateIcon: 'hass:alert-rhombus',
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
      config.entity = undefined;
    }

    if (config.tilt && (config.tilt < 0 || config.tilt > 100)) {
      console.error('Invalid tilt value provided in the config.');
      config.tilt = undefined;
    }

    this.entity = config.entity;
    this.tilt = config.tilt;
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
      <div
        class="container"
        @click=${this.toggleEntity}
        @contextmenu=${this.showEntityList}
      >
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
        this.config!.name || this.stateObj.attributes.friendly_name || 'Shade';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config!.icon || 'hass:roller-shade';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
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

    const state = this.stateObj.state || 'unknown';
    const position = this.stateObj.attributes.current_position;
    const tilt = this.tilt;

    const domain = 'cover';
    let service = 'toggle';
    let data = undefined;
    const target = { entity_id: this.entity };

    if (['closing', 'opening'].includes(state)) {
      service = 'stop_cover';
    } else if (tilt && position && position !== tilt) {
      service = 'set_cover_tilt_position';
      data = { position: tilt };
    } else if (state === 'open') {
      service = 'close_cover';
    } else if (state === 'closed') {
      service = 'open_cover';
    }

    console.log(`Calling service: ${domain}.${service}`);
    await callService(this.hass, domain, service, data, target);
  }

  private showMoreInfo(e: Event): void {
    e.stopPropagation();
    moreInfoDialog(this.stateObj, this.config?.callingDialog);
  }

  private showEntityList(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.stateObj) return;

    const group = this.config!.group || this.entity;
    const groupObj = this.hass.states[group];
    if (!groupObj) return;

    const entityIds = groupObj.attributes?.entity_id;
    if (entityIds.length === 0) return;

    const friendlyName = this.stateObj.attributes?.friendly_name || 'Unknown';
    entityListDialog(friendlyName, 'group', group, 'shade');
  }
}
