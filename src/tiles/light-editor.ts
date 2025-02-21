import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('smartqasa-light-tile-editor')
export class LightTileEditor extends LitElement {
  @state() protected config: any;

  setConfig(config: any) {
    this.config = { ...config }; // Ensure updates trigger reactivity
  }

  static styles = css`
    .table {
      display: table;
    }
    .row {
      display: table-row;
    }
    .cell {
      display: table-cell;
      padding: 0.5em;
    }
  `;

  render() {
    return html`
      <form class="table">
        <div class="row">
          <label class="cell" for="entity">Entity:</label>
          <input
              @input="${this.handleInputEvent}"
              class="cell" id="entity" .value="${this.config.entity ?? ''}"></input>
        </div>
        <div class="row">
          <label class="cell" for="name">Name:</label>
          <input
              @input="${this.handleInputEvent}"
              class="cell" id="name" .value="${this.config.name ?? ''}"></input>
        </div>
      </form>
    `;
  }

  handleInputEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    switch (input.id) {
      case 'entity':
        this.config.entity = input.value;
        break;
      case 'name':
        this.config.name = input.value;
        break;
    }
    this.dispatchConfigChanged();
  }

  dispatchConfigChanged() {
    const messageEvent = new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(messageEvent);
  }
}
