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
import { getDeviceOrientation, getDeviceType } from '../utilities/device-info';
import { createElements } from '../utilities/create-elements';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import { renderHeader } from './header';
import { renderArea } from './area';
import { loadControlTiles, renderControls } from './controls';
import { renderFooter } from './footer';

import lightModeImage from '../assets/backgrounds/background_light.jpg';
import darkModeImage from '../assets/backgrounds/background_dark.jpg';

import panelStyles from '../css/panel.css';
import swiperStyles from 'swiper/swiper-bundle.css';

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
    description: 'A SmartQasa card for rendering an panel.',
});
@customElement('smartqasa-panel-card')
export class PanelCard extends LitElement implements LovelaceCard {
    public getCardSize(): number | Promise<number> {
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

    private timeIntervalId: number | undefined;
    private resetTimer?: ReturnType<typeof setTimeout>;
    private area?: string;
    private areaObj?: HassArea;
    private headerChips: LovelaceCard[] = [];
    private areaChips: LovelaceCard[] = [];
    private controlTiles: LovelaceCard[][] = [];
    private controlColumns: number[] = [];

    static styles: CSSResultGroup = [
        unsafeCSS(swiperStyles),
        unsafeCSS(panelStyles),
    ];

    public setConfig(config: Config) {
        this.config = config;
        this.area = this.config.area;
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this.syncTime();

        window.addEventListener('resize', this.boundHandleDeviceChanges);
        window.addEventListener(
            'orientationchange',
            this.boundHandleDeviceChanges
        );
        window.addEventListener('touchstart', this.boundStartResetTimer, {
            passive: true,
        });

        this.startResetTimer();
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has('config')) {
            this.loadContent();
        }

        if (changedProps.has('hass') && this.hass) {
            this.handleThemeChanges();

            const isAdminMode =
                this.hass.states['input_boolean.admin_mode']?.state === 'on';
            this.isAdminMode =
                (this.hass.user?.is_admin ?? false) || isAdminMode;

            if (
                this.headerChips.length === 0 &&
                window.smartqasa.chipsConfig.length > 0
            ) {
                this.headerChips = createElements(
                    window.smartqasa.chipsConfig,
                    this.hass
                );
            }

            this.areaObj = this.area
                ? this.hass?.areas[this.area]
                : undefined;
        }
    }

    protected render(): TemplateResult | typeof nothing {
        if (!this.hass || !this.config || !this.area) return nothing;

        const name = this.config?.name ?? this.areaObj?.name ?? 'Area';
        const picture = this.config.picture ?? `${this.area}.png`;

        // prettier-ignore
        return html`
            <div
                class="container"
                ?admin=${this.isAdminMode}
            >
                ${this.isTablet ? renderHeader(this.headerChips) : nothing}
                ${renderArea(name, picture, this.areaChips, this.isPhone, this.isLandscape)}
                ${renderControls(this.controlTiles, this.controlColumns, this.isPhone, this.swiper)}
                ${this.isPhone && this.isLandscape ? nothing : renderFooter()}
            </div>
        `;
    }

    protected updated(changedProps: PropertyValues): void {
        if (changedProps.has('hass') && this.hass) {
            if (
                this.isTablet &&
                this.controlTiles.length > 1 &&
                !this.swiper
            ) {
                this.initializeSwiper();
            }

            this.updateContent();
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

        if (this.timeIntervalId !== undefined) {
            clearInterval(this.timeIntervalId);
        }

        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
        }
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

    private handleThemeChanges(): void {
        if (this.hass?.themes?.darkMode) {
            this.style.backgroundImage = `url(${darkModeImage})`;
        } else {
            this.style.backgroundImage = `url(${lightModeImage})`;
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
        if (this.swiper && this.swiper.activeIndex !== 0) {
            this.swiper.slideTo(0);
        }

        this.startResetTimer();
    }

    private loadContent(): void {
        if (!this.hass || !this.config) return;

        const headerChipsConfig =
            (this.config.header_chips?.length ?? 0) > 0
                ? this.config.header_chips
                : window.smartqasa.chipsConfig;
        this.headerChips = createElements(headerChipsConfig, this.hass);

        this.areaObj = this.area ? this.hass.areas[this.area] : undefined;
        this.areaChips = createElements(
            this.config.area_chips || [],
            this.hass
        );

        const { controlTiles, controlColumns } = loadControlTiles(
            this.config.tiles || [],
            this.hass,
            this.isTablet
        );
        this.controlTiles = controlTiles;
        this.controlColumns = controlColumns;
    }

    protected updateContent(): void {
        const updateHassForCards = (cards: LovelaceCard[]) => {
            cards.forEach((card) => {
                if (card.hass !== this.hass) card.hass = this.hass;
            });
        };

        if (this.headerChips.length > 0) updateHassForCards(this.headerChips);

        if (this.areaChips.length > 0) updateHassForCards(this.areaChips);

        if (this.controlTiles.length > 0) {
            this.controlTiles.forEach((page) => {
                updateHassForCards(page);
            });
        }
    }
}
