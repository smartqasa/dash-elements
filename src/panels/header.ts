import { html, TemplateResult } from 'lit';
import { LovelaceCard } from '../types';
import { formattedTime2, formattedDate } from '../utilities/format-date-time';
import { launchApp } from '../utilities/launch-app';

async function launchClock(e: Event): Promise<void> {
  e.stopPropagation();
  const launched = launchApp('clock');
  if (!launched) {
    console.error('Failed to launch app "clock".');
  }
}

export function renderHeader(headerChips?: LovelaceCard[]): TemplateResult {
  const chips = headerChips ?? [];

  return html`
    <div class="header-container">
      <div class="header-time-date" @click="${launchClock}">
        <div class="time">${formattedTime2()}</div>
        <div class="date">${formattedDate()}</div>
      </div>
      <div class="header-chips">
        ${chips.map((chip) => html`<div class="chip">${chip}</div>`)}
      </div>
    </div>
  `;
}
