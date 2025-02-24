import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { LovelaceCard, LovelaceCardConfig } from '../types';
import { dialogPopup } from '../dialogs/dialog-popup';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  url: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-webpage-tile',
  name: 'SmartQasa Webpage Tile',
  preview: true,
  description: 'A SmartQasa tile for displaying a web page',
});

@customElement('smartqasa-webpage-tile')
export class WebpageTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @state() protected config?: Config;
  private url: string = 'http://www.smartqasa.com';
  private icon: string = 'hass:web';
  private name: string = 'Web Page';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.url) throw new Error('A valid URL must be specified.');

    try {
      const testUrl = new URL(config.url);
      this.url = testUrl.href;
    } catch {
      console.error('Invalid URL provided:', config.url);
      throw new Error('Invalid URL. Please specify a valid URL.');
    }

    if (config.icon) this.icon = config.icon;
    if (config.name) this.name = config.name;
    this.config = config;
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this.showDialog}>
        <div class="icon">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this.name}</div>
        </div>
      </div>
    `;
  }

  private showDialog(e: Event): void {
    e.stopPropagation();
    if (!this.url) return;

    try {
      const validatedUrl = new URL(this.url);
      const dialogConfig: any = {
        title: this.name,
        timeout: 120000,
        size: 'fullscreen',
        content: {
          type: 'iframe',
          url: validatedUrl.href,
        },
      };

      dialogPopup(dialogConfig);
    } catch {
      console.error('Failed to launch URL:', this.url);
      alert('Unable to launch the web page. The URL is invalid.');
    }
  }
}
