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
    HassArea,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardConfig,
} from '../types';
import { getDeviceOrientation, getDeviceType } from '../utils/device-info';
import { navigateToArea } from '../utils/navigate-to-area';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation } from 'swiper/modules';
import { createElement } from '../utils/create-element';
import { loadYamlAsJson } from '../utils/load-yaml-as-json';
import { areasDialog } from '../misc/areas-dialog';
import { menuConfig } from '../misc/menu-config';
import { formattedTime, formattedDate } from '../utils/format-date-time';

import panelStyles from '../css/panel.css';
import swiperStyles from 'swiper/swiper-bundle.css';
import defaultImage from '../assets/images/default.png';

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

interface ActionHandlers {
    _handleHome: () => void;
    _handleAreas: () => void;
    _handleEntertain: () => void;
    _handleMenu: () => void;
}

window.customCards.push({
    type: 'smartqasa-panel-card',
    name: 'SmartQasa Panel Card',
    preview: true,
    description: 'A SmartQasa card for rendering an panel.',
});
@customElement('smartqasa-panel-card')
export class PanelCard extends LitElement {
    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() private config?: Config;
    @state() private adminMode = false;
    @state() private displayMode: 'control' | 'entertain' = 'control';
    @state() private deviceOrientation: string = getDeviceOrientation();
    @state() private isPhone: boolean = getDeviceType() === 'phone';
    @state() private isTablet: boolean = getDeviceType() === 'tablet';
    @state() private isPortrait: boolean =
        this.deviceOrientation === 'portrait';
    @state() private isLandscape: boolean =
        this.deviceOrientation === 'landscape';
    @state() private areaPicture: string = defaultImage;
    private timeIntervalId: number | undefined;
    private swiper?: Swiper;
    private resetTimer?: ReturnType<typeof setTimeout>;
    private area?: string;
    private areaObj?: HassArea;
    private headerChips: LovelaceCard[] = [];
    private areaChips: LovelaceCard[] = [];
    private bodyTiles: LovelaceCard[][] = [];
    private bodyColumns: number[] = [];

    static styles: CSSResultGroup = [
        unsafeCSS(swiperStyles),
        unsafeCSS(panelStyles),
    ];

    public async setConfig(config: Config) {
        this.config = { ...config };
        this.area = this.config.area;
        this.areaPicture = await this.getAreaPicture();
    }

    protected async firstUpdated() {
        await this.loadContent();

        if (this.isTablet) {
            this.initializeSwiper();
            this.startResetTimer();
        }

        ['orientationchange', 'resize'].forEach((event) =>
            window.addEventListener(event, this.handleDeviceChanges.bind(this))
        );

        this.syncTime();
    }

    protected updated(changedProps: PropertyValues) {
        if (this.hass) {
            const adminMode =
                this.hass.states['input_boolean.admin_mode']?.state === 'on';
            this.adminMode = (this.hass.user?.is_admin ?? false) || adminMode;
        }

        if (this.isTablet) {
            if (this.swiper) {
                this.swiper.update();
            } else {
                this.initializeSwiper();
            }
        }

        if (changedProps.has('config') && this.config) {
            this.loadContent();
        } else if (changedProps.has('hass') && this.hass) {
            this.areaObj = this.area
                ? this.hass.areas[this.area]
                : undefined;

            if (this.isTablet && this.headerChips.length) {
                this.headerChips.forEach((chip) => {
                    chip.hass = this.hass;
                });
            }

            if (this.areaChips.length) {
                this.areaChips.forEach((chip) => {
                    chip.hass = this.hass;
                });
            }

            if (this.bodyTiles.length) {
                this.bodyTiles.forEach((page) => {
                    page.forEach((tile) => {
                        tile.hass = this.hass;
                    });
                });
            }
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        if (this.timeIntervalId !== undefined) {
            clearInterval(this.timeIntervalId);
        }

        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
        }

        ['orientationchange', 'resize'].forEach((event) =>
            window.removeEventListener(
                event,
                this.handleDeviceChanges.bind(this)
            )
        );
    }

    protected render(): TemplateResult {
        const displayMode = this.displayMode;

        let content;
        // prettier-ignore
        switch (displayMode) {
            case "control":
                content = html`
                    ${this.renderArea()}
                    ${this.renderBody()}
                `;
                break;
            case "entertain":
                content = html`<!-- Entertain mode: Area and Body are hidden -->`;
                break;
            default:
                content = nothing;
                break;
        }

        // prettier-ignore
        return html`
            <div
                class="container"
                ?admin=${this.adminMode}
                ?control=${displayMode === "control"}
                ?entertain=${displayMode === "entertain"}
            >
                ${this.isTablet ? this.renderHeader() : nothing}
                ${content}
                ${this.isPhone && this.isLandscape ? nothing : this.renderFooter()}
            </div>
        `;
    }

    private handleDeviceChanges() {
        const type = getDeviceType();
        this.isPhone = type === 'phone';
        this.isTablet = type === 'tablet';

        const orientation = getDeviceOrientation();
        this.isPortrait = orientation === 'portrait';
        this.isLandscape = orientation === 'landscape';
    }

    private renderHeader() {
        return html`
            <div class="header-container">
                <div class="header-time-date" @click="${this.launchClock}">
                    <div class="time">${formattedTime()}</div>
                    <div class="date">${formattedDate()}</div>
                </div>
                <div class="header-chips">
                    ${this.headerChips.map(
                        (chip) => html`<div class="chip">${chip}</div>`
                    )}
                </div>
            </div>
        `;
    }

    private renderArea() {
        const name = this.config?.name ?? this.areaObj?.name ?? 'Area';

        return html`
            <div
                class="area-container"
                ?phone-portrait=${this.isPhone && this.isPortrait}
                ?phone-landscape=${this.isPhone && this.isLandscape}
            >
                <div class="area-name ${this.isPhone ? 'overlay' : ''}">
                    ${name}
                </div>
                <img
                    class="area-picture"
                    ?tablet-portrait=${this.isTablet && this.isPortrait}
                    ?phone-portrait=${this.isPhone && this.isPortrait}
                    ?phone-landscape=${this.isPhone && this.isLandscape}
                    src="${this.areaPicture}"
                    alt="Area picture..."
                />
                ${this.areaChips.length > 0
                    ? html`
                          <div class="area-chips">
                              ${this.areaChips.map(
                                  (chip) =>
                                      html`<div class="chip">${chip}</div>`
                              )}
                          </div>
                      `
                    : nothing}
                ${this.isPhone && this.isLandscape
                    ? html`<div class="footer-container">
                          ${this.renderFooter()}
                      </div>`
                    : nothing}
            </div>
        `;
    }

    private async getAreaPicture(): Promise<string> {
        if (this.config?.picture) {
            const configPictureFile = `/local/smartqasa/pictures/${this.config.picture}`;
            try {
                const response = await fetch(configPictureFile, {
                    method: 'HEAD',
                });
                if (response.ok) {
                    return configPictureFile;
                } else {
                    console.error(
                        'Picture from config not found, using defaultImage'
                    );
                    return defaultImage;
                }
            } catch (error) {
                console.error(
                    `Failed to check picture from config: ${this.config.picture}`,
                    error
                );
                return defaultImage;
            }
        }

        const areaFileName = `/local/smartqasa/pictures/${this.area}.png`;
        try {
            const response = await fetch(areaFileName, { method: 'HEAD' });
            if (response.ok) {
                return areaFileName;
            }
        } catch (error) {}

        if (this.areaObj?.picture) {
            return this.areaObj.picture;
        }

        return defaultImage;
    }

    private renderBody() {
        if (!this.config || !this.bodyTiles.length) return nothing;

        if (this.isPhone) {
            return html`
                <div class="body-tiles" phone>
                    ${this.bodyTiles
                        .flat()
                        .map((tile) => html`<div class="tile">${tile}</div>`)}
                </div>
            `;
        }

        return html`
            <div class="swiper">
                <div class="swiper-wrapper">
                    ${this.bodyTiles.map((page, index) => {
                        const gridStyle = {
                            gridTemplateColumns: `repeat(${this.bodyColumns[index]}, var(--sq-tile-width, 19.5rem))`,
                        };

                        return html`
                            <div class="swiper-slide">
                                <div
                                    class="body-tiles"
                                    style=${styleMap(gridStyle)}
                                >
                                    ${page.map(
                                        (tile) =>
                                            html`<div class="tile">
                                                ${tile}
                                            </div>`
                                    )}
                                </div>
                            </div>
                        `;
                    })}
                </div>
                ${this.bodyTiles.length > 1
                    ? html`
                          <div
                              class="swiper-button-prev"
                              @click=${(e: Event) =>
                                  this.handleSwiperNavigation(e, 'prev')}
                          ></div>
                          <div
                              class="swiper-button-next"
                              @click=${(e: Event) =>
                                  this.handleSwiperNavigation(e, 'next')}
                          ></div>
                      `
                    : nothing}
            </div>
        `;
    }

    private renderFooter() {
        return html`
            <div class="footer-container">
                ${this.renderFooterButton('hass:home', 'Home', '_handleHome')}
                ${this.renderFooterButton(
                    'hass:view-dashboard',
                    'Areas',
                    '_handleAreas'
                )}
                ${this.renderFooterButton(
                    'hass:music',
                    'Entertainment',
                    '_handleEntertain'
                )}
                ${this.renderFooterButton('hass:menu', 'Menu', '_handleMenu')}
            </div>
        `;
    }

    private renderFooterButton(
        icon: string,
        name: string,
        methodName: keyof ActionHandlers
    ): TemplateResult {
        return html`
            <div
                class="footer-button"
                @click="${(e: Event) =>
                    this.handleFooterAction(e, methodName)}"
            >
                <ha-icon .icon=${icon}></ha-icon>
                <span>${name}</span>
            </div>
        `;
    }

    private syncTime() {
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
        if (this.bodyTiles.length <= 1) {
            return;
        }

        const swiperContainer = this.shadowRoot?.querySelector('.swiper');
        if (!swiperContainer) return;

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

        if (this.swiper) {
            Swiper.use([Navigation]);
        }
    }

    private startResetTimer() {
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

    private resetToFirstPage() {
        if (this.swiper && this.swiper.activeIndex !== 0) {
            this.swiper.slideTo(0);
        }

        this.startResetTimer();
    }

    private async loadContent() {
        this.areaObj = this.area ? this.hass?.areas[this.area] : undefined;

        this.headerChips = await this.loadHeaderChips();

        if (this.config?.chips) {
            this.areaChips = await this.loadAreaChips(this.config.chips);
        }

        if (this.config?.tiles) {
            this.bodyTiles = await this.loadBodyTiles(this.config.tiles);
        }
    }

    private async loadHeaderChips(): Promise<LovelaceCard[]> {
        let chipsConfig: LovelaceCardConfig[] = [];
        try {
            const yamlFilePath = '/local/smartqasa/config/chips.yaml';
            chipsConfig = (await loadYamlAsJson(
                yamlFilePath
            )) as LovelaceCardConfig[];
        } catch (error) {
            console.error('Error loading header chips:', error);
            return [];
        }

        return chipsConfig.map((config) => {
            const chip = createElement(config) as LovelaceCard;
            chip.hass = this.hass;
            return chip;
        });
    }

    private async loadAreaChips(
        chipsConfig: LovelaceCardConfig[]
    ): Promise<LovelaceCard[]> {
        return chipsConfig.map((config) => {
            const chip = createElement(config) as LovelaceCard;
            chip.hass = this.hass;
            return chip;
        });
    }

    private async loadBodyTiles(
        tilesConfig: LovelaceCardConfig[]
    ): Promise<LovelaceCard[][]> {
        const pages: LovelaceCard[][] = [];
        this.bodyColumns = [];
        let currentPage: LovelaceCard[] = [];
        let firstTile = true;

        for (const config of tilesConfig) {
            if (firstTile) {
                const columns =
                    config.type === 'page' &&
                    config.columns >= 2 &&
                    config.columns <= 4
                        ? config.columns
                        : 3;
                this.bodyColumns.push(columns);
            }

            if (config.type === 'page') {
                if (!firstTile && currentPage.length) {
                    pages.push(currentPage);
                    currentPage = [];

                    const columns =
                        config.type === 'page' &&
                        config.columns >= 2 &&
                        config.columns <= 4
                            ? config.columns
                            : 3;
                    this.bodyColumns.push(columns);
                }
            } else if (config.type === 'blank') {
                if (this.isTablet) {
                    const blankTile = document.createElement('div');
                    blankTile.classList.add('blank-tile');
                    currentPage.push(blankTile as unknown as LovelaceCard);
                }
            } else {
                const tile = createElement(config) as LovelaceCard;
                if (tile) {
                    tile.hass = this.hass;
                    currentPage.push(tile);
                } else {
                    console.error('Failed to create tile for config:', config);
                }
            }

            firstTile = false;
        }

        if (currentPage.length) {
            pages.push(currentPage);
        }

        return pages;
    }

    private launchClock(e: Event) {
        e.stopPropagation();
        if (
            typeof window.fully !== 'undefined' &&
            window.fully.startApplication
        ) {
            window.fully.startApplication('com.google.android.deskclock');
        } else {
            console.warn('fully.startApplication is not available.');
        }
    }

    private handleSwiperNavigation(e: Event, direction: 'prev' | 'next') {
        e.stopPropagation();
        if (this.swiper) {
            if (direction === 'prev') {
                this.swiper.slidePrev();
            } else {
                this.swiper.slideNext();
            }

            this.startResetTimer();
        }
    }

    private handleFooterAction(e: Event, methodName: keyof ActionHandlers) {
        e.stopPropagation();
        if (typeof this[methodName] === 'function') {
            this[methodName]();
        } else {
            console.error(`Method not found: ${methodName}`);
        }
    }

    private handleHome() {
        if (this.displayMode !== 'control') {
            this.displayMode = 'control';
            return;
        }

        const startArea = window.smartqasa.startArea;
        if (!startArea) return;

        const url = new URL(location.href);
        const pathSegments = url.pathname.split('/');
        const currentArea = pathSegments.pop();

        if (currentArea !== startArea) {
            navigateToArea(startArea);
        } else {
            navigateToArea('home');
        }
    }

    private handleAreas() {
        this.displayMode = 'control';
        areasDialog(this.hass);
    }

    private handleEntertain() {
        this.displayMode = 'entertain';
    }

    private async handleMenu(): Promise<void> {
        window.smartqasa.menuTab = 0;
        try {
            const dialogConfig = await menuConfig();
            window.browser_mod?.service('popup', dialogConfig);
        } catch (error) {
            console.error('Error loading menu configuration', error);
        }
    }
}
