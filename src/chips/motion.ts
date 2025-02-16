import {
    CSSResultGroup,
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

import chipBaseStyle from '../css/chip-base.css';
import chipTextStyle from '../css/chip-text.css';

interface Config extends LovelaceCardConfig {
    automation: string;
    sensor?: string;
    name?: string;
}

window.customCards.push({
    type: 'smartqasa-motion-chip',
    name: 'SmartQasa Motion Sensor Chip',
    preview: true,
    description:
        'A SmartQasa chip for toggling a motion sensor automation entity.',
});

@customElement('smartqasa-motion-chip')
export class MotionChip extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 1;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;
    @state() private _automationObj?: HassEntity;
    @state() private _sensorObj?: HassEntity;

    private _automation?: string;
    private _sensor?: string;
    private _icon: string = 'hass:motion-sensor';
    private _iconStyles: Record<string, string> = {};
    private _name: string = '';

    static get styles(): CSSResultGroup {
        return [unsafeCSS(chipBaseStyle), unsafeCSS(chipTextStyle)];
    }

    public setConfig(config: Config): void {
        if (!config.automation?.startsWith('automation.')) {
            console.error('A valid automation entity must be provided.');
            this._config = undefined;
            return;
        }
        if (config.sensor && !config.sensor.startsWith('binary_sensor.')) {
            console.error('A valid binary sensor entity must be provided.');
            this._config = undefined;
            return;
        }

        this._config = config;
        this._automation = config.automation;
        this._sensor = config.sensor;
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if (changedProps.has('_config')) return true;

        if (changedProps.has('hass')) {
            const newAutomationState = this._automation
                ? this.hass?.states[this._automation]
                : undefined;
            const newSensorState = this._sensor
                ? this.hass?.states[this._sensor]
                : undefined;

            return (
                newAutomationState !== this._automationObj ||
                newSensorState !== this._sensorObj
            );
        }

        return false;
    }

    protected willUpdate(changedProps: PropertyValues): void {
        this._updateState();
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this._config || !this.hass) return nothing;

        return html`
            <div class="container" @click=${this._toggleEntity}>
                <div class="icon" style="${styleMap(this._iconStyles)}">
                    <ha-icon icon=${this._icon}></ha-icon>
                </div>
                ${this._name
                    ? html`<div class="text">${this._name}</div>`
                    : null}
            </div>
        `;
    }

    private _updateState(): void {
        const { icon, iconColor } = this._getIconAndColor();
        this._icon = icon;
        this._name = this._config?.name || '';

        this._iconStyles = {
            color: `rgb(${iconColor})`,
            paddingRight: this._name
                ? 'calc(var(--sq-chip-padding) / 2)'
                : 'var(--sq-chip-padding)',
        };
    }

    private _getIconAndColor(): { icon: string; iconColor: string } {
        let icon = 'hass:motion-sensor-off';
        let iconColor = 'var(--sq-unavailable-rgb)';

        if (this._automationObj) {
            switch (this._automationObj.state) {
                case 'on':
                    icon = 'hass:motion-sensor';
                    iconColor =
                        this._sensorObj?.state === 'on'
                            ? 'var(--sq-blue-rgb)'
                            : 'var(--sq-primary-font-rgb)';
                    break;
                case 'off':
                    icon = 'hass:motion-sensor-off';
                    iconColor = 'var(--sq-red-rgb)';
                    break;
            }
        } else {
            icon = this._config?.icon || 'hass:motion-sensor-off';
        }

        return { icon, iconColor };
    }

    private _toggleEntity(e: Event): void {
        e.stopPropagation();
        callService(this.hass, 'automation', 'toggle', {
            entity_id: this._automation,
        });
    }
}
