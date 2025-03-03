import {
  CSSResult,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
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
import { deviceRefresh, deviceReboot } from '../utilities/device-actions';

import panelStyles from '../css/main.css';

interface Config extends LovelaceCardConfig {}

window.customCards.push({
  type: 'smartqasa-main-card',
  name: 'SmartQasa Main Card',
  preview: true,
  description: 'A SmartQasa card for rendering the main panel.',
});

@customElement('smartqasa-main-card')
export class MainCard extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;

  @state() private isAdminMode = false;
  @state() private isPhone: boolean = getDeviceType() === 'phone';
  @state() private isTablet: boolean = getDeviceType() === 'tablet';
  @state() private isPortrait: boolean = getDeviceOrientation() === 'portrait';
  @state() private isLandscape: boolean =
    getDeviceOrientation() === 'landscape';

  private boundHandleDeviceChanges = () => this.handleDeviceChanges();
  private boundStartDashboardTimer = () => this.startDashboardTimer();

  private timeIntervalId: ReturnType<typeof setInterval> | undefined;
  private dashboardTimer: ReturnType<typeof setTimeout> | undefined;
  private themeStyle: string | undefined;
  private themeMode: string | undefined;
  private deviceRefreshState: string | undefined;
  private deviceRebootState: string | undefined;
  private backgroundImage: string | undefined;
  private headerChips?: LovelaceCard[];
  private area: string | undefined;
  private areaObj: HassArea | undefined;
  private areaName: string | undefined;
  private areaPicture: string | undefined;
  private areaChips: LovelaceCard[] = [];
  private controlTiles: LovelaceCard[][] = [];
  private controlColumns: number[] = [];

  static get styles(): CSSResult {
    return panelStyles;
  }

  public setConfig(config: Config) {
    this.config = config;
    this.area = this.config.area;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.timeIntervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.requestUpdate();
      }
    }, 1000);

    window.addEventListener('resize', this.boundHandleDeviceChanges);
    window.addEventListener('orientationchange', this.boundHandleDeviceChanges);
    window.addEventListener('touchstart', this.boundStartDashboardTimer, {
      passive: true,
    });

    this.startDashboardTimer();
  }

  protected willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has('config')) {
      this.loadContent();
    }

    if (changedProps.has('hass') && this.hass) {
      this.handleBackgroundChange();

      this.isAdminMode =
        (this.hass.user?.is_admin ?? false) ||
        this.hass.states['input_boolean.admin_mode']?.state === 'on';

      this.areaObj = this.area ? this.hass?.areas[this.area] : undefined;
    }
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config || !this.area) return nothing;

    const panelStyle = {
      opacity: 1,
      backgroundImage: this.backgroundImage || 'none',
    };

    return html`
      <div
        class="panel"
        style=${styleMap(panelStyle)}
        ?admin=${this.isAdminMode}
      >
        ${this.isTablet ? renderHeader(this.headerChips ?? []) : nothing}
        ${renderArea(
          this.areaName,
          this.areaPicture,
          this.areaChips,
          this.isPhone,
          this.isLandscape
        )}
        ${renderControls(this.controlTiles, this.controlColumns, this.isPhone)}
        ${this.isPhone && this.isLandscape ? nothing : renderFooter()}
      </div>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      this.deviceRefreshState = deviceRefresh(
        this.hass,
        this.deviceRefreshState
      );

      this.deviceRebootState = deviceReboot(this.hass, this.deviceRebootState);

      this.updateContent();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
      this.timeIntervalId = undefined;
    }

    if (this.dashboardTimer) {
      clearTimeout(this.dashboardTimer);
      this.dashboardTimer = undefined;
    }

    window.removeEventListener('resize', this.boundHandleDeviceChanges);
    window.removeEventListener(
      'orientationchange',
      this.boundHandleDeviceChanges
    );
    window.removeEventListener('touchstart', this.boundStartDashboardTimer);
  }

  private loadContent(): void {
    if (!this.config || !this.hass) return;

    if (!this.headerChips) this.loadHeaderChips();

    this.areaObj = this.area ? this.hass.areas[this.area] : undefined;
    this.areaName = this.config.name ?? this.areaObj?.name ?? 'Unknown';

    this.areaPicture = this.config.picture ?? `${this.area}.png`;

    this.areaChips = createElements(this.config.area_chips || [], this.hass);

    const { controlTiles, controlColumns } = loadControlTiles(
      this.config.tiles ?? [],
      this.hass,
      this.isTablet
    );
    this.controlTiles = controlTiles;
    this.controlColumns = controlColumns;
  }

  private async loadHeaderChips(): Promise<void> {
    if (!this.config || !this.hass) return;

    if (!window.smartqasa.chipsConfig) {
      const yamlFilePath = '/local/smartqasa/custom/chips.yaml';
      const chipsConfig =
        await loadYamlAsJson<LovelaceCardConfig[]>(yamlFilePath);
      window.smartqasa.chipsConfig = chipsConfig;
    }
    const chipsConfig = this.config.headerchips?.length
      ? this.config.headerchips
      : (window.smartqasa.chipsConfig ?? []);
    this.headerChips = createElements(chipsConfig, this.hass) || [];
  }

  protected updateContent(): void {
    requestAnimationFrame(() => {
      const updateHassForCards = (cards: LovelaceCard[]) => {
        for (const card of cards) {
          if (card.hass !== this.hass) card.hass = this.hass;
        }
      };

      [this.headerChips, this.areaChips, ...this.controlTiles].forEach(
        (group) => group?.length && updateHassForCards(group)
      );
    });
  }

  private handleDeviceChanges(): void {
    const type = getDeviceType() ?? 'desktop';
    this.isPhone = type === 'phone';
    this.isTablet = type === 'tablet';

    const orientation = getDeviceOrientation() ?? 'landscape';
    this.isPortrait = orientation === 'portrait';
    this.isLandscape = orientation === 'landscape';
  }

  private handleBackgroundChange(): void {
    if (!this.hass) return;

    const mode = this.hass.themes.darkMode ? 'dark' : 'light';
    const style =
      this.hass.states[
        'input_select.dashboard_background'
      ]?.state?.toLowerCase() || 'default';

    if (this.themeMode === mode && this.themeStyle === style) return;

    const baseUrl = new URL(location.href).origin;
    const imagePath =
      style === 'custom'
        ? 'local/smartqasa/custom/backgrounds'
        : `local/smartqasa/media/backgrounds/${style}`;

    this.backgroundImage = `url(${baseUrl}/${imagePath}/${mode}.jpg)`;

    this.themeMode = mode;
    this.themeStyle = style;
  }

  private startDashboardTimer(): void {
    clearTimeout(this.dashboardTimer);
    const delay = 5 * 60 * 1000;
    this.dashboardTimer = setTimeout(() => this.resetDashboard(), delay);
  }

  private resetDashboard(): void {
    this.startDashboardTimer();

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
