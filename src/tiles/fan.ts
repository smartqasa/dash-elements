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
  entity: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-fan-tile',
  name: 'SmartQasa Fan Tile',
  preview: true,
  description: 'A SmartQasa tile for controlling a fan entity.',
});

@customElement('smartqasa-fan-tile')
export class FanTile extends LitElement implements LovelaceCard {
  getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private icon: string = 'hass:fan-alert';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Fan';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('fan.')) {
      console.error('Invalid fan entity provided in the config.');
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
      <div
        class="container"
        @click=${this.toggleEntity}
        @contextmenu=${this.showEntityList}
      >
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
    let icon, iconAnimation, iconColor, name, stateFmtd;

    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    if (this.stateObj) {
      const state = this.stateObj.state || 'unknown';
      icon = this.config!.icon || this.stateObj.attributes.icon || 'hass:fan';
      if (state == 'on' && icon === 'hass:fan') {
        if (this.stateObj.attributes.percentage) {
          const speed = 0.5 + (1 - this.stateObj.attributes.percentage / 100);
          const direction =
            this.stateObj.attributes.direction == 'reverse'
              ? 'reverse'
              : 'normal';
          iconAnimation = `spin ${speed}s linear infinite ${direction}`;
        } else {
          iconAnimation = `spin 0.5s linear infinite normal`;
        }
      } else {
        iconAnimation = 'none';
      }
      iconColor =
        state === 'on' ? 'var(--sq-fan-on-rgb)' : 'var(--sq-inactive-rgb)';
      name =
        this.config!.name || this.stateObj.attributes.friendly_name || 'Fan';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      icon = this.config!.icon || 'hass:fan-alert';
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

    const domain = this.entity.split('.')[0];
    const action = 'toggle';
    const data = undefined;
    const target = { entity_id: this.entity };

    await callService(this.hass, domain, action, data, target);
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
    entityListDialog(friendlyName, 'group', group, 'fan');
  }
}
