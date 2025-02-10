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
    HassArea,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { getDeviceOrientation, getDeviceType } from '../utilities/device-info';
import { loadYamlAsJson } from '../utilities/load-yaml-as-json';
import { createElements } from '../utilities/create-elements';
import { renderHeader } from './header';
import { renderArea } from './area';
import { loadControlTiles, renderControls } from './control';
import { renderFooter } from './footer';
import { navigateToArea } from '../utilities/navigate-to-area';
import {
    handleDeviceRefresh,
    handleDeviceReboot,
} from '../utilities/device-actions';

import panelStyles from '../css/panel.css';

interface Config extends LovelaceCardConfig {
    area: string;
    name: string | undefined;
    picture: string | undefined;
    audio_player?: string;
    video_player?: string;
    video_sound?: string;
    header_chips?: LovelaceCardConfig[];
    area_chips?: LovelaceCardConfig[];
    tiles?: LovelaceCardConfig[];
}

window.customCards.push({
    type: 'smartqasa-panel-card',
    name: 'SmartQasa Panel Card',
    preview: true,
    description: 'A SmartQasa card for rendering a panel.',
});

@customElement('smartqasa-panel-card')
export class PanelCard extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
        return 100;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected _config?: Config;

    @state() private _isAdminMode = false;
    @state() private _isPhone: boolean = getDeviceType() === 'phone';
    @state() private _isTablet: boolean = getDeviceType() === 'tablet';
    @state() private _isPortrait: boolean =
        getDeviceOrientation() === 'portrait';
    @state() private _isLandscape: boolean =
        getDeviceOrientation() === 'landscape';

    private _boundHandleDeviceChanges = () => this._handleDeviceChanges();
    private _boundStartDashboardTimer = () => this._startDashboardTimer();

    private _timeIntervalId: ReturnType<typeof setInterval> | undefined;
    private _dashboardTimer: ReturnType<typeof setTimeout> | undefined;
    private _themeStyle: string | undefined;
    private _themeMode: string | undefined;
    private _deviceRefreshState: string | undefined;
    private _deviceRebootState: string | undefined;
    private _backgroundImage: string | undefined;
    private _headerChips?: LovelaceCard[];
    private _area: string | undefined;
    private _areaObj: HassArea | undefined;
    private _areaName: string | undefined;
    private _areaPicture: string | undefined;
    private _areaChips: LovelaceCard[] = [];
    private _controlTiles: LovelaceCard[][] = [];
    private _controlColumns: number[] = [];

    static get styles(): CSSResult {
        return unsafeCSS(panelStyles);
    }

    public setConfig(config: Config) {
        this._config = config;
        this._area = this._config.area;
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this._timeIntervalId = setInterval(() => {
            if (document.visibilityState === 'visible') {
                this.requestUpdate();
            }
        }, 1000);

        window.addEventListener('resize', this._boundHandleDeviceChanges);
        window.addEventListener(
            'orientationchange',
            this._boundHandleDeviceChanges
        );
        window.addEventListener('touchstart', this._boundStartDashboardTimer, {
            passive: true,
        });

        this._startDashboardTimer();
    }

    protected willUpdate(changedProps: PropertyValues): void {
        super.willUpdate(changedProps);

        if (changedProps.has('_config')) {
            this._loadContent();
        }

        if (changedProps.has('hass') && this.hass) {
            this._handleBackgroundChange();

            this._isAdminMode =
                (this.hass.user?.is_admin ?? false) ||
                this.hass.states['input_boolean.admin_mode']?.state === 'on';

            this._areaObj = this._area
                ? this.hass?.areas[this._area]
                : undefined;
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.hass || !this._config || !this._area) return nothing;

        const panelStyle = {
            opacity: 1,
            backgroundImage: this._backgroundImage || 'none',
        };

        return html`
            <div
                class="panel"
                style=${styleMap(panelStyle)}
                ?admin=${this._isAdminMode}
            >
                ${this._isTablet
                    ? renderHeader(this._headerChips ?? [])
                    : nothing}
                ${renderArea(
                    this._areaName,
                    this._areaPicture,
                    this._areaChips,
                    this._isPhone,
                    this._isLandscape
                )}
                ${renderControls(
                    this._controlTiles,
                    this._controlColumns,
                    this._isPhone
                )}
                ${this._isPhone && this._isLandscape ? nothing : renderFooter()}
            </div>
        `;
    }

    protected updated(changedProps: PropertyValues): void {
        super.updated(changedProps);

        if (changedProps.has('hass') && this.hass) {
            this._deviceRefreshState = handleDeviceRefresh(
                this.hass,
                this._deviceRefreshState
            );

            this._deviceRebootState = handleDeviceReboot(
                this.hass,
                this._deviceRebootState
            );

            this._updateContent();
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this._timeIntervalId) {
            clearInterval(this._timeIntervalId);
            this._timeIntervalId = undefined;
        }

        if (this._dashboardTimer) {
            clearTimeout(this._dashboardTimer);
            this._dashboardTimer = undefined;
        }

        window.removeEventListener('resize', this._boundHandleDeviceChanges);
        window.removeEventListener(
            'orientationchange',
            this._boundHandleDeviceChanges
        );
        window.removeEventListener(
            'touchstart',
            this._boundStartDashboardTimer
        );
    }

    private _loadContent(): void {
        if (!this._config || !this.hass) return;

        if (!this._headerChips) this._loadHeaderChips();

        this._areaObj = this._area ? this.hass.areas[this._area] : undefined;
        this._areaName = this._config.name ?? this._areaObj?.name ?? 'Unknown';

        this._areaPicture = this._config.picture ?? `${this._area}.png`;

        this._areaChips = createElements(
            this._config.area_chips || [],
            this.hass
        );

        const { controlTiles, controlColumns } = loadControlTiles(
            this._config.tiles ?? [],
            this.hass,
            this._isTablet
        );
        this._controlTiles = controlTiles;
        this._controlColumns = controlColumns;
    }

    private async _loadHeaderChips(): Promise<void> {
        if (!this._config || !this.hass) return;

        if (!window.smartqasa.chipsConfig) {
            const yamlFilePath = '/local/smartqasa/custom/chips.yaml';
            const chipsConfig =
                await loadYamlAsJson<LovelaceCardConfig[]>(yamlFilePath);
            window.smartqasa.chipsConfig = chipsConfig;
        }
        const chipsConfig = this._config.header_chips?.length
            ? this._config.header_chips
            : (window.smartqasa.chipsConfig ?? []);
        this._headerChips = createElements(chipsConfig, this.hass) || [];
    }

    protected _updateContent(): void {
        requestAnimationFrame(() => {
            const updateHassForCards = (cards: LovelaceCard[]) => {
                for (const card of cards) {
                    if (card.hass !== this.hass) card.hass = this.hass;
                }
            };

            [this._headerChips, this._areaChips, ...this._controlTiles].forEach(
                (group) => group?.length && updateHassForCards(group)
            );
        });
    }

    private _handleDeviceChanges(): void {
        const type = getDeviceType() ?? 'desktop';
        this._isPhone = type === 'phone';
        this._isTablet = type === 'tablet';

        const orientation = getDeviceOrientation() ?? 'landscape';
        this._isPortrait = orientation === 'portrait';
        this._isLandscape = orientation === 'landscape';
    }

    private _handleBackgroundChange(): void {
        if (!this.hass) return;

        const mode = this.hass.themes.darkMode ? 'dark' : 'light';
        const style =
            this.hass.states[
                'input_select.dashboard_background'
            ]?.state?.toLowerCase() || 'default';

        if (this._themeMode === mode && this._themeStyle === style) return;

        const baseUrl = new URL(location.href).origin;
        const imagePath =
            style === 'custom'
                ? 'local/smartqasa/custom/backgrounds'
                : `local/smartqasa/media/backgrounds/${style}`;

        this._backgroundImage = `url(${baseUrl}/${imagePath}/${mode}.jpg)`;

        this._themeMode = mode;
        this._themeStyle = style;
    }

    private _startDashboardTimer(): void {
        clearTimeout(this._dashboardTimer);
        const delay = 5 * 60 * 1000;
        this._dashboardTimer = setTimeout(() => this._resetDashboard(), delay);
    }

    /*
    private _handleRefreshDashboard(): void {
        const state =
            this.hass?.states['input_button.refresh_dashboards']?.state;

        if (this._refreshDashboardState === undefined) {
            this._refreshDashboardState = state;
            return;
        }

        if (this._refreshDashboardState === state) return;

        this._refreshDashboardState = state;

        if (window.fully) {
            executeFullyAction('restartApp');
        } else {
            window.browser_mod?.service('refresh');
        }
    }

    private _handleRebootDevice(): void {
        if (!window.fully || !this.hass) return;

        const state = this.hass.states['input_button.reboot_devices']?.state;
        if (this._rebootDeviceState === undefined) {
            this._rebootDeviceState = state;
            return;
        }

        if (this._rebootDeviceState === state) return;

        this._rebootDeviceState = state;
        executeFullyAction('reboot');
    } 
    */

    private _resetDashboard(): void {
        this._startDashboardTimer();

        const swiperContainer = this.shadowRoot?.querySelector(
            'swiper-container'
        ) as any;

        if (swiperContainer?.swiper?.activeIndex !== 0) {
            swiperContainer.swiper.slideTo(0);
            return;
        }

        const area = location.pathname.split('/').pop();
        if (area !== window.smartqasa.startArea) {
            navigateToArea(window.smartqasa.startArea);
        }
    }
}
