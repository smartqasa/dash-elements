import {
    CSSResult,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
    unsafeCSS,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
    DialogObj,
    HassEntity,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { formatState } from '../utilities/format-state';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    dialog_file: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: 'smartqasa-custom-tile',
    name: 'SmartQasa custom Tile',
    preview: true,
    description: 'A SmartQasa tile for displaying a custom dialog.',
});

@customElement('smartqasa-custom-tile')
export class DialogTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 2;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _dialogObj?: DialogObj;
    @state() private _stateObj?: HassEntity;

    private _entity?: string;
    private _icon: string = 'hass:help-rhombus';
    private _iconStyles: Record<string, string> = {};
    private _name: string = 'Unknown Dialog';
    private _stateFmtd: string = 'Unknown State';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public async setConfig(config: Config): Promise<void> {
        if (!config.dialog_file) {
            console.error('dialog_file must be provided in the config.');
            return;
        }

        try {
            const path = `/local/smartqasa/custom/dialogs/${config.dialog_file}`;
            this._dialogObj = (await loadYamlAsJson(path)) as DialogObj;
            this._entity = this._dialogObj.entity;
        } catch (error) {
            console.error('Failed to load YAML:', error);
        }

        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (changedProps.has('_config')) return true;

        if (changedProps.has('hass')) {
            const newState = this._entity
                ? this.hass?.states[this._entity]
                : undefined;

            return newState !== this._stateObj;
        }

        return false;
    }

    protected willUpdate(changedProps: PropertyValues): void {
        this._updateState();
    }

    protected render(): TemplateResult {
        return html`
            <div class="container" @click=${this._showDialog}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                    <div class="state">${this._stateFmtd}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        let icon, iconColor, name, stateFmtd;
        if (this._stateObj) {
            const state = this._stateObj.state || 'unknown';
            icon =
                this._config!.icon ||
                this._stateObj.attributes.icon ||
                'hass:cctv';
            iconColor =
                state === 'on'
                    ? 'var(--sq-orange-rgb)'
                    : 'var(--sq-inactive-rgb)';
            name =
                this._config!.name ||
                this._stateObj.attributes.friendly_name ||
                'Cameras';
            stateFmtd = state === 'on' ? 'Detected' : 'Clear';
        } else {
            icon = this._config?.icon || 'hass:cctv-off';
            iconColor = 'var(--sq-unavailable-rgb)';
            name = this._config?.name || 'Unknown';
            stateFmtd = 'Unknown State';
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-opacity))`,
        };
        this._icon = icon;
        this._name = name;
        this._stateFmtd = stateFmtd;
    }

    private _showDialog(e: Event): void {
        e.stopPropagation();
        const dialogObj = this._dialogObj;
        if (dialogObj?.data)
            window.browser_mod?.service('popup', dialogObj.data);
    }
}
