import { CSSResult, html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { LovelaceCard, LovelaceCardConfig } from '../types';
import { dialogPopup } from '../dialogs/dialog-popup';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    url: string;
    icon: string;
    name: string;
}

window.customCards.push({
    type: 'smartqasa-browser-mod-tile',
    name: 'SmartQasa Browser Mod Tile',
    preview: true,
    description: 'A SmartQasa tile for displaying the Browswer Mod page',
});

@customElement('smartqasa-browser-mod-tile')
export class BrowserModTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @state() protected _config?: Config;
    private _url: string | undefined;
    private _icon: string = 'hass:web';
    private _name: string = 'Web Page';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        const baseUrl = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
        this._url = `${baseUrl}/browser-mod`;

        if (config.icon) this._icon = config.icon;
        if (config.name) this._name = config.name;
        this._config = config;
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                </div>
            </div>
        `;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        if (!this._url) return;

        try {
            const validatedUrl = new URL(this._url);
            const dialogConfig: any = {
                title: this._name,
                timeout: 120000,
                size: 'fullscreen',
                content: {
                    type: 'iframe',
                    url: validatedUrl.href,
                },
            };

            dialogPopup(dialogConfig);
        } catch {
            console.error('Failed to launch URL:', this._url);
            alert('Unable to launch the web page. The URL is invalid.');
        }
    }
}
