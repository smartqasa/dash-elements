import {
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { dialogTable } from '../dialogs/dialog-table';
import { dialogPopup } from '../dialogs/dialog-popup';
import { launchApp } from '../utilities/launch-app';
import { formatState } from '../utilities/format-state';

import tileStyle from '../css/tile.css';
import musicBarsStyle from '../css/music-bars.css';

interface Config extends LovelaceCardConfig {
  entity?: string;
}

window.customCards.push({
  type: 'smartqasa-audio-tile',
  name: 'SmartQasa Audio Tile',
  preview: true,
  description: 'A SmartQasa tile for displaying an audio dialog.',
});

@customElement('smartqasa-audio-tile')
export class AudioTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private iconHtml: TemplateResult = html``;
  private name: string = 'Unknown Speaker';
  private stateFmtd: string = 'Unknown State';

  static get styles(): CSSResultGroup[] {
    return [tileStyle, musicBarsStyle];
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

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.showDialog}>
        ${this.iconHtml}
        <div class="text">
          <div class="name">${this.name}</div>
          <div class="state">${this.stateFmtd}</div>
        </div>
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let iconHtml, name, stateFmtd;
    if (this.stateObj) {
      const state = this.stateObj.state || 'unknown';
      if (state === 'playing') {
        iconHtml = html`
          <div class="bars tile" @click=${this.launchApp}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        `;
      } else {
        iconHtml = html`
          <div class="icon" @click=${this.launchApp}>
            <ha-icon icon="hass:music"></ha-icon>
          </div>
        `;
      }
      name =
        this.config!.name ||
        this.stateObj.attributes.friendly_name ||
        'Speaker';
      stateFmtd = formatState(this.hass!, this.entity!);
    } else {
      iconHtml = html`
        <div class="icon">
          <ha-icon icon="hass:music"></ha-icon>
        </div>
      `;
      name = this.config?.name || 'Unknown Speaker';
      stateFmtd = 'Unknown State';
    }

    this.iconHtml = iconHtml;
    this.name = name;
    this.stateFmtd = stateFmtd;
  }

  private showDialog(e: Event): void {
    e.stopPropagation();
    const dialogObj = dialogTable['sonos'];
    if (!dialogObj) return;

    const dialogConfig = { ...dialogObj.data };
    if (this.entity) dialogConfig.content.entityId = this.entity;

    dialogPopup(dialogObj.data);
  }

  private launchApp(e: Event): void {
    e.stopPropagation();
    launchApp('com.sonos.acr2');
  }
}
