import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { LovelaceCard, LovelaceCardConfig } from '../types';
import { appTable } from '../tables/apps';
import { launchApp } from '../utilities/launch-app';

import tileStyle from '../css/tile.css';
interface Config extends LovelaceCardConfig {
  app: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-app-tile',
  name: 'SmartQasa App Tile',
  preview: true,
  description: 'A SmartQasa tile for launching applications from the dashboard',
});

@customElement('smartqasa-app-tile')
export class AppTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @state() protected config?: Config;
  private app?: string;
  private appObj?: any;

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.app) throw new Error('A valid app must be specified.');

    this.app = config.app;
    this.appObj = appTable[config.app] || undefined;
    this.config = config;
  }

  protected render(): TemplateResult {
    let iconStyle: string, iconTemplate: any, name: string;
    if (this.appObj) {
      if (this.config?.icon) {
        iconStyle =
          'color: rgb(var(--sq-inactive-rgb)); background-color: rgba(var(--sq-inactive-rgb), var(--sq-icon-alpha));';
        iconTemplate = html`<ha-icon icon=${this.config.icon}></ha-icon>`;
      } else if (this.appObj?.appIcon) {
        iconStyle =
          'height: calc(var(--sq-icon-size) + var(--sq-icon-padding) * 2); width: calc(var(--sq-icon-size) + var(--sq-icon-padding) * 2); padding: 0;';
        iconTemplate = html`<img
          src="${this.appObj.appIcon}"
          alt="App Icon"
          style="border-radius: 50%;"
        />`;
      } else {
        iconStyle =
          'color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-alpha));';
        iconTemplate = html`<ha-icon icon="hass:help-rhombus"></ha-icon>`;
      }
    } else {
      iconStyle =
        'color: rgb(var(--sq-unavailable-rgb)); background-color: rgba(var(--sq-unavailable-rgb), var(--sq-icon-alpha));';
      iconTemplate = html`<ha-icon icon="hass:alert-rhombus"></ha-icon>`;
    }
    name = this.config?.name || this.appObj?.name || this.config?.app;

    return html`
      <div class="container" @click=${this.launchApp}>
        <div class="icon" style=${iconStyle}>${iconTemplate}</div>
        <div class="text">
          <div class="name">${name}</div>
        </div>
      </div>
    `;
  }

  private launchApp(e: Event): void {
    e.stopPropagation();
    if (!this.app) return;

    launchApp(this.app);
  }
}
