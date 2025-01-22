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

import {
    HassArea,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { getDeviceOrientation, getDeviceType } from '../utilities/device-info';
import { createElements } from '../utilities/create-elements';
import { renderHeader } from './header';
import { renderArea } from './area';
import { loadControlTiles, renderControls } from './control';
import { renderFooter } from './footer';
import { navigateToArea } from '../utilities/navigate-to-area';

import panelStyles from '../css/panel.css';

interface Config extends LovelaceCardConfig {
    area: string;
    name?: string;
    picture?: string;
    audio_player: string;
    video_player: string;
    video_sound: string;
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
    @state() private _refreshDashboardsState: String | undefined;
    @state() private _isAdminMode = false;
    @state() private _isPhone: boolean = getDeviceType() === 'phone';
    @state() private _isTablet: boolean = getDeviceType() === 'tablet';
    @state() private _isPortrait: boolean =
        getDeviceOrientation() === 'portrait';
    @state() private _isLandscape: boolean =
        getDeviceOrientation() === 'landscape';
    @state() private _isLoading = true;

    private _boundHandleDeviceChanges = () => this._handleDeviceChanges();
    private _boundDashResetTimer = () => this._startDashTimer();

    private _timeIntervalId: number | undefined;
    private _dashTimer?: ReturnType<typeof setTimeout>;
    private _area?: string;
    private _areaObj?: HassArea;
    private _headerChips: LovelaceCard[] = [];
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

        this._syncTime();

        window.addEventListener('resize', this._boundHandleDeviceChanges);
        window.addEventListener(
            'orientationchange',
            this._boundHandleDeviceChanges
        );
        window.addEventListener('touchstart', this._boundDashResetTimer, {
            passive: true,
        });

        this._startDashTimer();
    }

    protected willUpdate(changedProps: PropertyValues): void {
        super.willUpdate(changedProps);

        if (changedProps.has('_config')) {
            this._loadContent();
        }

        if (changedProps.has('hass') && this.hass) {
            this._handleRefreshDevice();
            this._handleThemeChanges();

            const isAdminMode =
                this.hass.states['input_boolean.admin_mode']?.state === 'on';
            this._isAdminMode =
                (this.hass.user?.is_admin ?? false) || isAdminMode;

            // Fallback if chipsConfig wasn't preloaded successfully
            const chipsConfig = window.smartqasa.chipsConfig ?? [];
            if (this._headerChips.length === 0 && chipsConfig.length > 0) {
                this._headerChips = createElements(chipsConfig, this.hass);
            }

            this._areaObj = this._area
                ? this.hass?.areas[this._area]
                : undefined;
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (this._isLoading || !this.hass || !this._config || !this._area) {
            return html`
                <div class="loading-screen">
                    <span>Loading...</span>
                </div>
            `;
        }

        const name = this._config?.name ?? this._areaObj?.name ?? 'Area';
        const picture = this._config.picture ?? `${this._area}.png`;

        return html`
            <div class="panel" ?admin=${this._isAdminMode}>
                ${this._isTablet ? renderHeader(this._headerChips) : nothing}
                ${renderArea(
                    name,
                    picture,
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
            this._updateContent();
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener('resize', this._boundHandleDeviceChanges);
        window.removeEventListener(
            'orientationchange',
            this._boundHandleDeviceChanges
        );
        window.removeEventListener('touchstart', this._boundDashResetTimer);

        if (this._timeIntervalId !== undefined) {
            clearInterval(this._timeIntervalId);
        }

        if (this._dashTimer) {
            clearTimeout(this._dashTimer);
        }
    }

    private _handleRefreshDevice(): void {
        const refreshDashboardsState =
            this.hass?.states['input_button.refresh_dashboards']?.state;
        if (!this._refreshDashboardsState)
            this._refreshDashboardsState = refreshDashboardsState;
        if (this._refreshDashboardsState === refreshDashboardsState) return;

        if (typeof window.fully !== 'undefined') {
            if (!window.fully.isInForeground())
                window.fully.bringToForeground();
            setTimeout(() => {
                window.fully?.clearCache();
            }, 2000);
            setTimeout(() => {
                window.fully?.restartApp();
            }, 2000);
            return;
        }

        if (typeof window.browser_mod !== 'undefined') {
            window.browser_mod.service('refresh');
        }
    }

    private _handleDeviceChanges(): void {
        const type = getDeviceType();
        this._isPhone = type === 'phone';
        this._isTablet = type === 'tablet';

        const orientation = getDeviceOrientation();
        this._isPortrait = orientation === 'portrait';
        this._isLandscape = orientation === 'landscape';
    }

    private _handleThemeChanges(): void {
        const panel = this.shadowRoot?.querySelector('.panel') as HTMLElement;

        if (panel) {
            const image = this.hass?.themes?.darkMode
                ? window.smartqasa.darkModeImage
                : window.smartqasa.lightModeImage;
            panel.style.backgroundImage = `url(${image})`;
        }
    }

    private _syncTime(): void {
        const syncTime = () => {
            const now = new Date();
            const millisecondsUntilNextSecond = 1000 - now.getMilliseconds();

            setTimeout(() => {
                requestAnimationFrame(syncTime);
            }, millisecondsUntilNextSecond);
        };

        syncTime();
    }

    private _startDashTimer(): void {
        if (this._dashTimer) {
            clearTimeout(this._dashTimer);
        }

        this._dashTimer = setTimeout(
            () => {
                this._resetDash();
            },
            1 * 60 * 1000
        ); // 5 minutes
    }

    private _resetDash(): void {
        this._startDashTimer();

        const area = location.pathname.split('/').pop();
        if (area !== window.smartqasa.startArea) {
            navigateToArea(window.smartqasa.startArea);
            return;
        }

        const swiperContainer = this.shadowRoot?.querySelector(
            'swiper-container'
        ) as any;

        if (swiperContainer && swiperContainer.swiper) {
            const currentPage = swiperContainer.swiper.activeIndex;
            if (currentPage !== 0) swiperContainer.swiper.slideTo(0);
        }
    }

    private async _loadContent(): Promise<void> {
        if (!this.hass || !this._config) return;

        const headerChipsConfig =
            (this._config.header_chips?.length ?? 0) > 0
                ? this._config.header_chips
                : (window.smartqasa.chipsConfig ?? []);
        this._headerChips = createElements(headerChipsConfig, this.hass);

        this._areaObj = this._area ? this.hass.areas[this._area] : undefined;
        this._areaChips = createElements(
            this._config.area_chips || [],
            this.hass
        );

        const { controlTiles, controlColumns } = loadControlTiles(
            this._config.tiles || [],
            this.hass,
            this._isTablet
        );
        this._controlTiles = controlTiles;
        this._controlColumns = controlColumns;

        this._isLoading = false;
    }

    protected _updateContent(): void {
        requestAnimationFrame(() => {
            const updateHassForCards = (cards: LovelaceCard[]) => {
                cards.forEach((card) => {
                    if (card.hass !== this.hass) card.hass = this.hass;
                });
            };

            if (this._headerChips.length > 0)
                updateHassForCards(this._headerChips);

            if (this._areaChips.length > 0) updateHassForCards(this._areaChips);

            if (this._controlTiles.length > 0) {
                this._controlTiles.forEach((page) => {
                    updateHassForCards(page);
                });
            }
        });
    }
}
