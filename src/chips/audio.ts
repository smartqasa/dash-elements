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

import chipBaseStyle from '../css/chip-base.css';
import musicBarsStyle from '../css/music-bars.css';

interface Config extends LovelaceCardConfig {
  entity?: string;
}

window.customCards.push({
  type: 'smartqasa-audio-chip',
  name: 'SmartQasa Audio Chip',
  preview: true,
  description: 'A SmartQasa chip for displaying an audio dialog.',
});

@customElement('smartqasa-audio-chip')
export class AudioChip extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  private entity?: string;
  private stateObj?: HassEntity;
  private iconTemplate?: TemplateResult;

  static get styles(): CSSResultGroup[] {
    return [chipBaseStyle, musicBarsStyle];
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
    if (!this.config || !this.entity) return nothing;

    return html`
      <div
        class="container"
        @click=${this.showDialog}
        @contextmenu=${this.launchApp}
      >
        ${this.iconTemplate}
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let iconTemplate;
    if (this.stateObj?.state === 'playing') {
      iconTemplate = html`
        <div class="bars">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      `;
    } else {
      iconTemplate = html`
        <div class="icon">
          <ha-icon icon="hass:music"></ha-icon>
        </div>
      `;
    }

    this.iconTemplate = iconTemplate;
  }

  private showDialog(e: Event): void {
    e.stopPropagation();
    const dialogObj = dialogTable['media_player'];
    if (!dialogObj) return;

    const dialogConfig = { ...dialogObj.data };
    if (this.entity) dialogConfig.content.entityId = this.entity;

    dialogPopup(dialogObj.data);
  }

  private launchApp(e: Event): void {
    e.stopPropagation();
    launchApp('sonos');
  }
}
