import {
    CSSResult,
    html,
    LitElement,
    nothing,
    PropertyValues,
    TemplateResult,
    unsafeCSS,
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

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

window.customCards.push({
    type: 'smartqasa-routine-tile',
    name: 'SmartQasa Routine Tile',
    preview: true,
    description:
        'A SmartQasa tile for triggering an automation, scene, or script entity.',
});

@customElement('smartqasa-routine-tile')
export class RoutineTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _running: boolean = false;

    private _entity?: string;
    private _stateObj?: HassEntity;
    private _icon: string = 'hass:play-circle';
    private _iconStyles: Record<string, string> = {};
    private _name: string = 'Unknown Routine';

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        this._entity = ['automation', 'scene', 'script'].includes(
            config.entity?.split('.')[0]
        )
            ? config.entity
            : undefined;
        this._config = config;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (changedProps.has('_config') || changedProps.has('_running'))
            return true;

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

    protected render(): TemplateResult | typeof nothing {
        return html`
            <div class="container" @click=${this._runRoutine}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                <div class="text">
                    <div class="name">${this._name}</div>
                </div>
            </div>
        `;
    }

    private _updateState(): void {
        this._stateObj = this._entity
            ? this.hass?.states[this._entity]
            : undefined;

        let icon, iconAnimation, iconColor, name;
        if (this._stateObj) {
            if (this._running) {
                icon = 'hass:rotate-right';
                iconAnimation = 'spin 1.0s linear infinite';
                iconColor = 'var(--sq-blue-rgb)';
            } else {
                icon =
                    this._config!.icon ||
                    this._stateObj.attributes.icon ||
                    'hass:play-circle';
                iconAnimation = 'none';
                iconColor = 'var(--sq-inactive-rgb)';
            }
            name =
                this._config?.name ||
                this._stateObj.attributes.friendly_name ||
                'Routine';
        } else {
            icon = this._config?.icon || 'hass:alert-rhombus';
            iconAnimation = 'none';
            iconColor = 'var(--sq-unavailable-rgb)';
            name = this._config?.name || 'Unknown Routine';
        }

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
            animation: iconAnimation,
        };
        this._icon = icon;
        this._name = name;
    }

    private _runRoutine(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._stateObj) return;

        this._running = true;

        const domain = this._stateObj.entity_id.split('.')[0];
        switch (domain) {
            case 'script':
                callService(this.hass, 'script', 'turn_on', {
                    entity_id: this._entity,
                });
                break;
            case 'scene':
                callService(this.hass, 'scene', 'turn_on', {
                    entity_id: this._entity,
                });
                break;
            case 'automation':
                callService(this.hass, 'automation', 'trigger', {
                    entity_id: this._entity,
                });
                break;
            default:
                console.error('Unsupported entity domain:', domain);
                break;
        }

        setTimeout(() => {
            this._running = false;
        }, 1000);
    }
}
