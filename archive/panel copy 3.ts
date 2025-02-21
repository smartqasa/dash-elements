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

import {
    HassArea,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { getDeviceOrientation, getDeviceType } from '../utils/device-info';
import { createElement } from '../utils/create-element';
import { createElements } from '../utils/create-elements';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import { renderHeader } from './header';
import { renderArea } from './area';
import { loadControlTiles, renderControls } from './controls';
import { loadEntertainCards } from './entertain';
import { renderFooter } from './footer';

import panelStyles from '../css/panel.css';
import entertainStyles from '../css/entertain.css';
import swiperStyles from 'swiper/swiper-bundle.css';

interface Config extends LovelaceCardConfig {
    area: string;
    name?: string;
    picture?: string;
    audio_player: string;
    video_player: string;
    video_sound: string;
    chips?: LovelaceCardConfig[];
    tiles?: LovelaceCardConfig[];
}

window.customCards.push({
    type: 'smartqasa-panel-card',
    name: 'SmartQasa Panel Card',
    preview: true,
    description: 'A SmartQasa card for rendering an panel.',
});
@customElement('smartqasa-panel-card')
export class PanelCard extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 100;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected config?: Config;
    @state() private isAdminMode = false;
    @state() private isPhone: boolean = getDeviceType() === 'phone';
    @state() private isTablet: boolean = getDeviceType() === 'tablet';
    @state() private isPortrait: boolean =
        getDeviceOrientation() === 'portrait';
    @state() private isLandscape: boolean =
        getDeviceOrientation() === 'landscape';
    @state() private swiper: Swiper | undefined;

    private boundHandleDeviceChanges = () => this.handleDeviceChanges();
    private boundStartResetTimer = () => this.startResetTimer();
    private viewModeChangedHandler = () => this.requestUpdate();

    private timeIntervalId: number | undefined;
    private resetTimer?: ReturnType<typeof setTimeout>;
    private area?: string;
    private areaObj?: HassArea;
    private headerChips: LovelaceCard[] = [];
    private areaChips: LovelaceCard[] = [];
    private controlTiles: LovelaceCard[][] = [];
    private controlColumns: number[] = [];
    private entertainCards: LovelaceCard[] = [];
    @state() private entertainTab: number = 0;

    static styles: CSSResultGroup = [
        unsafeCSS(swiperStyles),
        unsafeCSS(panelStyles),
        unsafeCSS(entertainStyles),
    ];

    public setConfig(config: Config) {
        this.config = { ...config };
        this.area = this.config.area;
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this.syncTime();

        window.smartqasa.viewMode = 'control';

        window.addEventListener('resize', this.boundHandleDeviceChanges);
        window.addEventListener(
            'orientationchange',
            this.boundHandleDeviceChanges
        );
        window.addEventListener('touchstart', this.boundStartResetTimer, {
            passive: true,
        });
        window.addEventListener(
            'viewModeChanged',
            this.viewModeChangedHandler
        );

        this.startResetTimer();
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (this.hass) {
            const isAdminMode =
                this.hass.states['input_boolean.admin_mode']?.state === 'on';
            this.isAdminMode =
                (this.hass.user?.is_admin ?? false) || isAdminMode;
        }

        if (
            this.hass &&
            this.headerChips.length === 0 &&
            window.smartqasa.chipsConfig.length > 0
        ) {
            this.headerChips = createElements(
                window.smartqasa.chipsConfig,
                this.hass
            );
        }

        if (changedProps.has('config') && this.config) this.loadContent();

        if (changedProps.has('hass') && this.hass) {
            this.areaObj = this.area
                ? this.hass?.areas[this.area]
                : undefined;

            const updateHassForCards = (cards: LovelaceCard[]) => {
                cards.forEach((card) => {
                    if (card.hass !== this.hass) card.hass = this.hass;
                });
            };

            if (this.isTablet && this.headerChips.length > 0)
                updateHassForCards(this.headerChips);

            if (this.areaChips.length > 0) updateHassForCards(this.areaChips);

            if (this.controlTiles.length > 0)
                this.controlTiles.forEach((page) => {
                    updateHassForCards(page);
                });
            //if (this.entertainCards.length > 0) updateHassForCards(this.entertainCards);
        }
    }

    protected firstUpdated(): void {
        this.loadContent();
    }

    protected updated(): void {
        if (this.isTablet && this.controlTiles.length > 1 && !this.swiper) {
            this.initializeSwiper();
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener('resize', this.boundHandleDeviceChanges);
        window.removeEventListener(
            'orientationchange',
            this.boundHandleDeviceChanges
        );
        window.removeEventListener('touchstart', this.boundStartResetTimer);
        window.removeEventListener(
            'viewModeChanged',
            this.viewModeChangedHandler
        );

        if (this.timeIntervalId !== undefined) {
            clearInterval(this.timeIntervalId);
        }

        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.hass || !this.config || !this.area) return nothing;

        const viewMode = window.smartqasa.viewMode;
        const name = this.config?.name ?? this.areaObj?.name ?? 'Area';
        let content;
        switch (viewMode) {
            case 'control':
                const picture = this.config.picture ?? `${this.area}.png`;
                content = html`
                    ${renderArea(
                        name,
                        picture,
                        this.areaChips,
                        this.isPhone,
                        this.isLandscape
                    )}
                    ${renderControls(
                        this.controlTiles,
                        this.controlColumns,
                        this.isPhone,
                        this.swiper
                    )}
                `;
                break;
            case 'entertain':
                content = html`
                    <div class="entertain-container">
                        <div class="entertain-sidebar">
                            <div class="area-name">${name}</div>
                            <div
                                class="entertain-button"
                                @click=${() => {
                                    this.entertainTab = 0;
                                }}
                            >
                                <ha-icon icon="hass:music"></ha-icon>
                                <span>Audio</span>
                            </div>
                            <div
                                class="entertain-button"
                                @click=${() => {
                                    this.entertainTab = 1;
                                }}
                            >
                                <ha-icon
                                    icon="hass:television-classic"
                                ></ha-icon>
                                <span>Video</span>
                            </div>
                            <div
                                class="entertain-button"
                                @click=${() => {
                                    this.entertainTab = 2;
                                }}
                            >
                                <ha-icon icon="hass:exit-to-app"></ha-icon>
                                <span>Apps</span>
                            </div>
                        </div>
                        <div class="entertain-cards">
                            ${this.entertainCards[this.entertainTab]}
                        </div>
                    </div>
                `;
                break;
            default:
                content = nothing;
                break;
        }

        // prettier-ignore
        return html`
            <div
                class="container"
                ?admin=${this.isAdminMode}
                ?control=${viewMode === "control"}
                ?entertain=${viewMode === "entertain"}
            >
                ${this.isTablet ? renderHeader(this.headerChips) : nothing}
                ${content}
                ${this.isPhone && this.isLandscape ? nothing : renderFooter()}
            </div>
        `;
    }

    private handleDeviceChanges(): void {
        const type = getDeviceType();
        this.isPhone = type === 'phone';
        this.isTablet = type === 'tablet';

        const orientation = getDeviceOrientation();
        this.isPortrait = orientation === 'portrait';
        this.isLandscape = orientation === 'landscape';

        if (this.isTablet && this.controlTiles.length > 1) {
            this.initializeSwiper();
        }
    }

    private syncTime(): void {
        const syncTime = () => {
            const now = new Date();
            const millisecondsUntilNextSecond = 1000 - now.getMilliseconds();

            setTimeout(() => {
                requestAnimationFrame(syncTime);
            }, millisecondsUntilNextSecond);
        };

        syncTime();
    }

    private initializeSwiper() {
        const swiperContainer = this.shadowRoot?.querySelector('.swiper');
        if (!swiperContainer) {
            console.error('Swiper container not found');
            return;
        }

        const swiperParams: SwiperOptions = {
            initialSlide: 0,
            loop: true,
            modules: [Navigation],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        };

        this.swiper = new Swiper(swiperContainer as HTMLElement, swiperParams);
    }

    private startResetTimer(): void {
        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
        }

        this.resetTimer = setTimeout(
            () => {
                this.resetToFirstPage();
            },
            5 * 60 * 1000
        ); // 5 minutes
    }

    private resetToFirstPage(): void {
        window.smartqasa.viewMode = 'control';
        if (this.swiper && this.swiper.activeIndex !== 0) {
            this.swiper.slideTo(0);
        }

        this.startResetTimer();
    }

    private loadContent(): void {
        if (!this.hass || !this.config) return;

        const headerChipsConfig = window.smartqasa.chipsConfig;
        if (headerChipsConfig)
            this.headerChips = createElements(
                window.smartqasa.chipsConfig,
                this.hass
            );

        this.areaObj = this.area ? this.hass.areas[this.area] : undefined;
        this.areaChips = createElements(this.config.chips || [], this.hass);

        const { controlTiles, controlColumns } = loadControlTiles(
            this.config.tiles || [],
            this.hass,
            this.isTablet
        );
        this.controlTiles = controlTiles;
        this.controlColumns = controlColumns;

        /*
        this.entertainCards = loadEntertainCards(
            this.config.audio_player || "",
            this.config.video_player || "",
            this.config.video_sound || "",
            this.hass
        ) as LovelaceCard[];
        */
    }
}
