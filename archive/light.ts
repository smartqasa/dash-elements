import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { moreInfoDialog } from '../utils/more-info-dialog';
import { entityListDialog } from '../utils/entity-list-dialog';

import { tileBaseStyle, tileStateStyle } from '../css/tile';

interface Config extends LovelaceCardConfig {
    entity: string;
    icon?: string;
    name?: string;
}

@customElement('smartqasa-light-tile')
export class LightTile extends LitElement {
    @state() private config?: Config;
    @state() private stateObj?: HassEntity;

    private entity?: string;
    private hass: any;
    private icon: string = 'hass:lightbulb';
    private iconAnimation: string = 'none';
    private iconColor: string = 'var(--sq-inactive-rgb)';
    private name: string = 'Loading...';
    private stateFmtd: string = 'Loading...';

    static styles: CSSResultGroup = [tileBaseStyle, tileStateStyle];

    setConfig(config: Config): void {
        this.config = { ...config };
        this.entity = this.config.entity?.startsWith('light.')
            ? this.config.entity
            : undefined;
        this.updateState();
    }

    set hass(hass: HomeAssistant) {
        if (
            !hass ||
            !this.entity ||
            hass.states[this.entity] === this.stateObj
        ) {
            this.stateObj = undefined;
            return;
        }
        this.hass = hass;
        this.stateObj = hass.states[this.entity];
        this.updateState();
    }

    private updateState(): void {
        if (!this.entity || !this.stateObj) {
            this.icon = this.config?.icon || 'hass:lightbulb-alert';
            this.iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
            this.name = this.config?.name || 'Unknown';
            this.stateFmtd = 'Invalid entity!';
            return;
        }

        const state = this.stateObj.state || 'unknown';
        this.icon =
            this.config?.icon ||
            this.stateObj.attributes.icon ||
            'hass:lightbulb';
        this.iconColor =
            state === 'on'
                ? 'var(--sq-light-on-rgb)'
                : 'var(--sq-inactive-rgb)';
        this.name =
            this.config?.name ||
            this.stateObj.attributes.friendly_name ||
            'Unknown';
        this.stateFmtd =
            this.hass.formatEntityState(this.stateObj) +
            (state === 'on' && this.stateObj.attributes.brightness
                ? ' - ' +
                  this.hass.formatEntityAttributeValue(
                      this.stateObj,
                      'brightness'
                  )
                : '');
    }

    protected render(): TemplateResult {
        const iconStyles = {
            color: `rgb(${this.iconColor})`,
            backgroundColor: `rgba(${this.iconColor}, var(--sq-icon-alpha))`,
            animation: this.iconAnimation,
        };

        return html`
            <div
                class="container"
                @click=${this.showMoreInfo}
                @contextmenu=${this.showEntityList}
            >
                <div
                    class="icon"
                    @click=${this.toggleEntity}
                    style="${styleMap(iconStyles)}"
                >
                    <ha-icon .icon=${this.icon}></ha-icon>
                </div>
                <div class="name">${this.name}</div>
                <div class="state">${this.stateFmtd}</div>
            </div>
        `;
    }

    private toggleEntity(e: Event): void {
        e.stopPropagation();
        if (!this.stateObj) return;

        this.hass.callService('light', 'toggle', { entity_id: this.entity });
    }

    private showMoreInfo(e: Event): void {
        e.stopPropagation();
        moreInfoDialog(this.config, this.stateObj);
    }

    private showEntityList(e: Event): void {
        e.stopPropagation();
        if (
            !this.stateObj ||
            !Array.isArray(this.stateObj.attributes?.entity_id) ||
            this.stateObj.attributes.entity_id.length === 0
        )
            return;
        entityListDialog(
            this.stateObj.attributes?.friendly_name || 'Unknown',
            'group',
            this.entity,
            'light'
        );
    }

    getCardSize() {
        return 1;
    }

    static getConfigElement() {
        return document.createElement('smartqasa-light-tile-editor');
    }

    static getStubConfig() {
        return {
            entity: '',
            icon: '',
            name: '',
        };
    }
}

window.customCards.push({
    type: 'smartqasa-light-tile',
    name: 'SmartQasa Light Tile',
    preview: true,
    description: 'A SmartQasa tile for controlling a light entity.',
});
