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
import { formatState } from '../utilities/format-state';
import { callService } from '../utilities/call-service';
import { moreInfoDialog } from '../dialogs/more-info-dialog';
import { entityListDialog } from '../dialogs/entity-list-dialog';
import { dialogPopup } from '../dialogs/dialog-popup';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
    entity: string;
    group?: string;
    icon?: string;
    name?: string;
    grid?: boolean;
    grid_columns?: number;
    grid_style?: 'circle' | 'square';
    grid_entities?: string[];
}

window.customCards.push({
    type: 'smartqasa-light-tile',
    name: 'SmartQasa Light Tile',
    preview: true,
    description: 'A SmartQasa tile for controlling a light entity.',
});

@customElement('smartqasa-light-tile')
export class LightTile extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 2;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _iconStyles: Record<string, string> = {};
    @state() private _name: string = 'Unknown Light';
    @state() private _stateFmtd: string = 'Unknown State';

    private _entity?: string;
    private _icon: string = 'hass:lightbulb-alert';
    private _stateObj?: HassEntity;

    static get styles(): CSSResult {
        return unsafeCSS(tileStyle);
    }

    public setConfig(config: Config): void {
        if (!config.entity?.startsWith('light.')) {
            console.error('Invalid light entity provided in the config.');
            this._entity = undefined;
        } else {
            this._entity = config.entity;
        }
        this._config = config;
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has('_config')) {
            this._updateState();
            return;
        }

        if (changedProps.has('hass')) {
            const newStateObj = this.hass?.states[this._entity ?? ''];
            if (newStateObj?.state !== this._stateObj?.state) {
                this._updateState();
            }
        }
    }

    protected render(): TemplateResult | typeof nothing {
        console.log('Rendering Light Tile');
        return html`
            <div
                class="container"
                @click=${this._toggleEntity}
                @contextmenu=${this._showEntityList}
            >
                <div
                    class="icon"
                    @click=${this._showMoreInfo}
                    style=${styleMap(this._iconStyles)}
                >
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
        let icon, iconColor, name, stateFmtd;

        this._stateObj = this.hass?.states[this._entity ?? ''];
        if (this._stateObj) {
            const state = this._stateObj.state || 'unknown';
            icon =
                this._config!.icon ||
                this._stateObj.attributes.icon ||
                'hass:lightbulb';
            iconColor =
                state === 'on'
                    ? 'var(--sq-light-on-rgb)'
                    : 'var(--sq-inactive-rgb)';
            name =
                this._config!.name ||
                this._stateObj.attributes.friendly_name ||
                'Light';
            stateFmtd = formatState(this.hass!, this._entity!);
        } else {
            icon = this._config?.icon || 'hass:lightbulb-alert';
            iconColor = 'var(--sq-unavailable-rgb)';
            name = this._config?.name || 'Unknown Light';
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

    private _toggleEntity(e: Event): void {
        e.stopPropagation();

        if (this._stateObj?.state === 'on') {
            callService(this.hass, 'light', 'turn_off', {
                entity_id: this._entity,
                transition: 2,
            });
        } else {
            callService(this.hass, 'light', 'turn_on', {
                entity_id: this._entity,
            });
        }
    }

    private _showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this._stateObj, this._config?.callingDialog);
    }

    private _showEntityList(e: Event): void {
        e.stopPropagation();
        if (!this.hass || !this._config || !this._stateObj) return;

        if (!this._config.grid) {
            let group;
            if (this._config.group) {
                group = this._config.group;
                const groupObj = this.hass.states[group];
                if (!groupObj || groupObj.attributes?.entity_id?.length === 0)
                    return;
            } else if (this._stateObj.attributes?.entity_id?.length > 0) {
                group = this._entity;
            } else {
                group = `${this._entity}_group`;
                const groupObj = this.hass.states[group];
                if (!groupObj || groupObj.attributes?.entity_id?.length === 0)
                    return;
            }

            const friendlyName =
                this._stateObj.attributes?.friendly_name ?? 'Unknown';
            entityListDialog(friendlyName, 'group', group, 'light');
        }

        const entities = Array.isArray(this._config.grid_entities)
            ? this._config.grid_entities
            : [];
        if (entities.length === 0) return;

        const columns = this._config.grid_columns ?? 2;
        const style = this._config.grid_style ?? 'circle';

        const dialogConfig = {
            title: this._stateObj.attributes.friendly_name || 'Light Group',
            timeout: 120000,
            content: {
                type: 'custom:smartqasa-light-grid-card',
                title: this._stateObj.attributes.friendly_name || 'Light Group',
                columns: columns,
                style: style,
                entities: entities,
            },
        };

        dialogPopup(dialogConfig);
    }
}
