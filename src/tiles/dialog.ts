import {
  CSSResult,
  html,
  LitElement,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { LovelaceCard, LovelaceCardConfig } from '../types';
import { dialogTable } from '../dialogs/dialog-table';
import { dialogPopup } from '../dialogs/dialog-popup';

import tileStyle from '../css/tile.css';

interface Config extends LovelaceCardConfig {
  dialog: string;
  icon?: string;
  name?: string;
}

window.customCards.push({
  type: 'smartqasa-dialog-tile',
  name: 'SmartQasa Dialog Tile',
  preview: true,
  description: 'A SmartQasa card for displaying a browser_mod popup dialog.',
});

@customElement('smartqasa-dialog-tile')
export class DialogTile extends LitElement implements LovelaceCard {
  public getCardSize(): number | Promise<number> {
    return 1;
  }

  @state() private config?: Config;
  @state() private dialogObj?: any;

  private icon: string = 'hass:help-rhombus';
  private iconStyles: Record<string, string> = {};
  private name: string = 'Unknown Dialog';

  static get styles(): CSSResult {
    return tileStyle;
  }

  public setConfig(config: Config): void {
    this.config = config;
    this.dialogObj = dialogTable[config.dialog];
  }

  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);
    this.updateState();
  }

  protected render(): TemplateResult {
    return html`
      <div class="container" @click=${this.showDialog}>
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
    let icon, iconColor, name;

    if (this.config && this.dialogObj) {
      icon = this.config.icon || this.dialogObj.icon;
      iconColor = 'var(--sq-inactive-rgb)';
      name = this.config.name || this.dialogObj.name;
    } else {
      icon = this.config?.icon || 'hass:help-rhombus';
      iconColor = 'var(--sq-unavailable-rgb, 255, 0, 255)';
      name = this.config?.name || 'Unknown';
    }

    this.iconStyles = {
      color: `rgb(${iconColor})`,
      backgroundColor: `rgba(${iconColor}, var(--sq-icon-alpha))`,
    };
    this.icon = icon;
    this.name = name;
  }

  private showDialog(e: Event) {
    e.stopPropagation();
    if (!this.dialogObj) return;
    dialogPopup(this.dialogObj.data, this.config?.callingDialog || undefined);
  }
}
