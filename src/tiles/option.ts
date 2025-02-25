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
  HassEntity,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
} from '../types';
import { callService } from '../utilities/call-service';
import { menuConfig } from '../misc/menu-config';
import { phaseIcons, modeIcons } from '../const';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  entity: string;
  option: string;
  trigger?: string;
}

window.customCards.push({
  type: 'smartqasa-option-tile',
  name: 'SmartQasa Option Tile',
  preview: true,
  description:
    'A SmartQasa tile for displaying an Option of an Input Select entity.',
});

@customElement('smartqasa-option-tile')
export class OptionTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() protected config?: Config;
  @state() private stateObj?: HassEntity;
  @state() private running: boolean = false;

  private entity?: string;
  private icon: string = 'hass:form-dropdown';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Lock';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    if (!config.entity?.startsWith('input_select.')) {
      console.error('Invalid input_select entity provided in the config.');
      this.entity = undefined;
    } else {
      this.entity = config.entity;
    }
    this.config = config;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (changedProps.has('config') || changedProps.has('running')) return true;

    if (changedProps.has('hass'))
      return (
        (this.entity ? this.hass?.states[this.entity] : undefined) !==
        this.stateObj
      );

    return false;
  }

  protected willUpdate(): void {
    this.updateState();
  }

  protected render(): TemplateResult | typeof nothing {
    return html`
      <div class="container" @click=${this.selectOption}>
        <div class="icon" style="${styleMap(this.iconStyles)}">
          <ha-icon icon=${this.icon}></ha-icon>
        </div>
        <div class="text">
          <div class="name">${this.name}</div>
        </div>
      </div>
    `;
  }

  private updateState(): void {
    this.stateObj = this.entity ? this.hass?.states[this.entity] : undefined;

    let icon, iconAnimation, iconColor, name;
    if (this.stateObj) {
      if (this.running) {
        icon = 'hass:rotate-right';
        iconAnimation = 'spin 1.0s linear infinite';
        iconColor = 'var(--sq-blue-rgb)';
      } else {
        if (this.entity === 'input_select.location_phase') {
          icon = phaseIcons[this.config!.option] || phaseIcons.default;
        } else if (this.entity === 'input_select.location_mode') {
          icon = modeIcons[this.config!.option] || modeIcons.default;
        } else {
          icon =
            this.config!.icon ||
            this.stateObj.attributes.icon ||
            'hass:form-dropdown';
        }
        iconAnimation = 'none';
        iconColor =
          this.stateObj.state === this.config!.option
            ? 'var(--sq-blue-rgb)'
            : 'var(--sq-inactive-rgb)';
      }
      name = this.config!.option || 'Unknown';
    } else {
      icon = this.config?.icon || 'hass:form-dropdown';
      iconAnimation = 'none';
      iconColor = 'var(--sq-unavailable-rgb)';
      name = this.config?.option || 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
      animation: iconAnimation,
    };
    this.icon = icon;
    this.name = name;
  }

  private async selectOption(e: Event): Promise<void> {
    e.stopPropagation();
    if (!this.config || !this.hass || !this.entity || !this.stateObj) return;

    this.running = true;

    const domain = 'input_select';
    const service = 'select_option';
    const data = { option: this.config.option };
    const target = { entity_id: this.entity };
    await callService(this.hass, domain, service, data, target);

    const trigger = this.config.trigger;
    if (trigger && trigger.startsWith('input_button.')) {
      const domain = 'input_button';
      const service = 'press';
      const data = undefined;
      const target = { entity_id: trigger };
      await callService(this.hass, domain, service, data, target);
    }

    setTimeout(() => {
      this.running = false;
      const menuTab = this.config?.menu_tab;
      if (menuTab !== undefined && menuTab >= 0 && menuTab <= 3) {
        this.showMenu();
      } else {
        window.browser_mod?.service('close_popup', {});
      }
    }, 1000);
  }

  private async showMenu(): Promise<void> {
    try {
      const dialogConfig = await menuConfig();
      window.browser_mod?.service('popup', dialogConfig);
    } catch (e) {
      window.browser_mod?.service('close_popup', {});
      console.error('Error opening menu dialog', e);
    }
  }
}
