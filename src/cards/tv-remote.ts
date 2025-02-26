import {
  css,
  CSSResult,
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
import { callService } from '../utilities/call-service';
import channelTable from '../tables/channels';

interface Config extends LovelaceCardConfig {
  entity: string;
  name?: string;
  audio_entity?: string;
  remote_entity?: string;
  video_entity?: string;
}

window.customCards.push({
  type: 'smartqasa-tv-remote-card',
  name: 'SmartQasa TV Remote Card',
  preview: true,
  description: 'A SmartQasa card for simulating a television remote control.',
});

@customElement('smartqasa-tv-remote-card')
export class TVRemoteCard extends LitElement implements LovelaceCard {
  public getCardSize(): number {
    return 10;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  private entity?: string;
  private stateObj?: HassEntity;
  private entities: { [key: string]: string | undefined } = {};

  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        border: var(--sq-card-border);
        border-radius: var(--sq-card-border-radius);
        box-sizing: border-box;
        background-color: var(--sq-card-background-color);
      }
      .container {
        display: flex;
        flex-direction: column;
        width: fit-content;
        padding: var(--sq-card-padding);
      }
      .name {
        padding: 0.5rem;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: var(--sq-primary-font-weight, 400);
        font-size: var(--sq-primary-font-size, 1.5rem);
        color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
        width: 100%;
      }
      .sections {
        display: grid;
        grid-template-columns: auto auto;
        gap: 4rem;
      }
      .row {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .icon {
        display: flex;
        justify-content: center;
        align-self: center;
        margin: 0.6rem;
        padding: 0.7rem 1rem;
        border: var(--sq-card-border, none);
        border-radius: var(--border-radius, 1rem);
        background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha));
        cursor: pointer;
      }
      ha-icon {
        --mdc-icon-size: var(--sq-icon-size);
      }
      .app-section {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .active-app {
        display: flex;
        width: 5.5rem;
        height: calc(5.5rem / 1.33);
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
      }
      .active-app img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .app-list {
        display: grid;
        grid-template-columns: repeat(3, 5.5rem);
        grid-auto-rows: calc(5.5rem / 1.33);
        gap: 1rem;
        justify-content: center;
        width: 100%;
        height: 25rem;
        overflow: hidden;
        overflow-y: auto;
        scrollbar-width: none;
      }
      .app-list::-webkit-scrollbar {
        display: none;
      }
      .app-item {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .app-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('media_player.')) {
      console.error('Invalid light entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
    this.config = config;
    this.initializeEntities();
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
    if (changedProps.has('config')) {
      this.initializeEntities();
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config || !this.entity || !this.entities.remote)
      return nothing;

    this.stateObj = this.hass.states[this.entity];
    if (!this.stateObj || !this.hass.states[this.entities.remote]) {
      return html`
        <ha-card>
          <div class="warning">Entity Unavailable</div>
        </ha-card>
      `;
    }

    return html`
      <div class="container">
        <div class="name">
          ${this.config!.name ||
          this.stateObj!.attributes.friendly_name ||
          'TV Remote'}
        </div>
        <div class="sections">
          <div class="remote-section">${this.renderRemoteSection()}</div>
          <div class="app-section">${this.renderAppSection()}</div>
        </div>
      </div>
    `;
  }

  private initializeEntities(): void {
    if (!this.hass || !this.config || !this.entity) return;

    this.entities.remote = this.config.remote_entity
      ? this.config.remote_entity
      : `remote.${this.entity.split('.')[1]}`;

    const entityBase = this.entity.split('.')[1].replace(/_roku$/, '');

    const findAudioEntity = () => {
      if (this.config?.audio_entity) return this.config.audio_entity;
      const candidates = [
        `media_player.${entityBase}_arc`,
        `media_player.${entityBase}_beam`,
        `media_player.${entityBase}_playbar`,
        `media_player.${entityBase}_sound_bar`,
        `media_player.${entityBase}_soundbar`,
        `media_player.${entityBase}_tv_speakers`,
        `media_player.${entityBase}_tv_speaker`,
        `media_player.${entityBase}_tv`,
      ];
      return (
        candidates.find((candidate) => this.hass?.states[candidate]) ||
        undefined
      );
    };

    const findVideoEntity = () => {
      if (this.config?.video_entity) return this.config.video_entity;
      const candidates = [
        `media_player.${entityBase}_frame_tv`,
        `media_player.${entityBase}_frame`,
        `media_player.${entityBase}_tv`,
      ];
      return (
        candidates.find((candidate) => this.hass?.states[candidate]) ||
        undefined
      );
    };

    this.entities.audio = findAudioEntity();
    this.entities.video = findVideoEntity();
  }

  private renderRemoteSection(): TemplateResult {
    return html`
      <div class="row">${this.renderButton('power', 'power', 'mdi:power')}</div>
      <div class="row">
        ${this.renderButton('command', 'back', 'mdi:restore')}
        ${this.renderButton('command', 'info', 'mdi:asterisk')}
        ${this.renderButton('command', 'home', 'mdi:home')}
      </div>
      <div class="row">
        ${this.renderButton('command', 'up', 'mdi:chevron-up')}
      </div>
      <div class="row">
        ${this.renderButton('command', 'left', 'mdi:chevron-left')}
        ${this.renderButton('command', 'select', 'mdi:checkbox-blank-circle')}
        ${this.renderButton('command', 'right', 'mdi:chevron-right')}
      </div>
      <div class="row">
        ${this.renderButton('command', 'down', 'mdi:chevron-down')}
      </div>
      <div class="row">
        ${this.renderButton('command', 'reverse', 'mdi:rewind')}
        ${this.renderButton('command', 'play', 'mdi:play-pause')}
        ${this.renderButton('command', 'forward', 'mdi:fast-forward')}
      </div>
      <div class="row">
        ${this.renderButton('volume', 'volume_down', 'mdi:volume-minus')}
        ${this.renderButton('volume_mute', 'volume_mute', 'mdi:volume-mute')}
        ${this.renderButton('volume_up', 'volume_up', 'mdi:volume-plus')}
      </div>
    `;
  }

  private renderButton(
    category: string,
    button: string,
    icon: string
  ): TemplateResult {
    return html`
      <div
        class="icon"
        data-category=${category}
        data-button=${button}
        @click=${this.handleButton}
      >
        <ha-icon icon=${icon}></ha-icon>
      </div>
    `;
  }

  private renderAppSection(): TemplateResult {
    const activeApp = this.stateObj!.attributes.app_name;
    const activeIcon = channelTable[activeApp];

    const availableApps = this.stateObj!.attributes.source_list.filter(
      (app: string) => app !== activeApp
    );

    return html`
      <div class="app-section">
        <div class="active-app" style="${this.getAppItemStyle(activeIcon)}">
          ${activeIcon
            ? html`<img src="${activeIcon}" alt="${activeApp}" />`
            : html`${activeApp}`}
        </div>
        <div class="app-list">
          ${availableApps.map((app: string) => {
            const icon = channelTable[app];
            return html`
              <div
                class="app-item"
                @click=${() => this.selectApp(app)}
                style="${this.getAppItemStyle(icon)}"
              >
                ${icon
                  ? html`<img src="${icon}" alt="${app}" />`
                  : html`${app}`}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private getAppItemStyle(icon: string | undefined): string {
    return icon
      ? ''
      : `
                background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha, 0.2));
                font-weight: var(--sq-secondary-font-weight, 300);
                font-size: var(--sq-secondary-font-size, 1rem);
                color: rgb(var(--sq-primary-font-rgb, 128, 128, 128));
                text-overflow: ellipsis;
                overflow: hidden;
            `;
  }

  private handleButton(e: Event): void {
    e.stopPropagation();
    if (!this.hass || !this.entity) return;

    const target = e.currentTarget as HTMLElement;
    const category = target.dataset.category!;
    const button = target.dataset.button!;

    if (category === 'power') {
      this.handlePower();
    } else if (category === 'volume') {
      this.handleVolume(button);
    } else if (category === 'command') {
      this.handleCommand(button);
    }
  }

  private async handlePower(): Promise<void> {
    const domain = 'remote';
    const service = 'send_command';
    const data = { command: 'power' };
    const target = { entity_id: this.entities.remote };
    await callService(this.hass, domain, service, data, target);
  }

  private async handleVolume(button: string): Promise<void> {
    const audioEntity = this.entities.audio;
    const remoteEntity = this.entities.remote;

    if (!audioEntity && !remoteEntity) return;

    let domain, service, data, target;

    if (audioEntity) {
      const isMuted = this.hass!.states[audioEntity].attributes.is_volume_muted;
      domain = 'media_player';
      service = isMuted ? button : 'volume_mute';
      data =
        isMuted || button === 'volume_mute'
          ? { is_volume_muted: !isMuted }
          : {};
      target = { entity_id: audioEntity };
    } else {
      domain = 'remote';
      service = 'send_command';
      data = { command: button };
      target = { entity_id: remoteEntity };
    }

    await callService(this.hass, domain, service, data, target);
  }

  private handleCommand(button: string): void {
    callService(this.hass, 'remote', 'send_command', {
      entity_id: this.entities.remote,
      command: button,
    });
  }

  private selectApp(app: string): void {
    if (!this.hass || !this.entity) return;
    callService(this.hass, 'media_player', 'select_source', {
      entity_id: this.entity,
      source: app,
    });
  }
}
