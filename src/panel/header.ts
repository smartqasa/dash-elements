import { LovelaceCard } from '../types';
import { html, TemplateResult } from 'lit';
import {
    formattedTimeBlink,
    formattedDate,
} from '../utilities/format-date-time';
import { launchApp } from '../utilities/launch-app';

function launchClock(e: Event): void {
    e.stopPropagation();
    launchApp('clock');
}

export function renderHeader(headerChips?: LovelaceCard[]): TemplateResult {
    const chips = headerChips ?? [];

    return html`
        <div class="header-container">
            <div class="header-time-date" @click="${launchClock}">
                <div class="time">${formattedTimeBlink()}</div>
                <div class="date">${formattedDate()}</div>
            </div>
            <div class="header-chips">
                ${chips.map((chip) => html`<div class="chip">${chip}</div>`)}
            </div>
        </div>
    `;
}
