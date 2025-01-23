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
    type: 'smartqasa-settings-tile',
    name: 'SmartQasa Settings Tile',
    preview: true,
    description:
        'A SmartQasa tile for displaying the Home Assistant Settings page',
});

@customElement('smartqasa-settings-tile')
export class SettingsTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @state() protected _config?: Config;
    private _icon: string = 'hass:cog';
    private _name: string = 'Settings';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
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
        const url = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}/config/dashboard`;

        try {
            const validatedUrl = new URL(url);
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
            console.error('Failed to launch URL:', url);
            alert('Unable to launch the web page. The URL is invalid.');
        }
    }
}
