import {
    css,
    html,
    LitElement,
    PropertyValues,
    TemplateResult,
    nothing,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from '../types';
import { createElement } from '../utils/create-element';

interface Config extends LovelaceCardConfig {
    entity?: string;
}

window.customCards.push({
    type: 'smartqasa-sonos-card',
    name: 'SmartQasa Sonos Card',
    preview: true,
    description: 'A SmartQasa element that display a set of Sonos cards.',
});

@customElement('smartqasa-sonos-card')
export class SonosPanelCard extends LitElement implements LovelaceCard {
    public getCardSize(): number {
        return 10;
    }

    @property({ attribute: false }) public hass?: HomeAssistant;
    @state() protected config?: Config;
    private entity?: string;

    private speakersCard?: LovelaceCard;
    private playerCard?: LovelaceCard;
    private mediaCard?: LovelaceCard;

    static get styles() {
        return css`
            .container {
                display: grid;
                grid-template-columns: 0.8fr 1fr 0.8fr;
                gap: var(--sq-card-spacing, 0.8rem);
            }
        `;
    }

    public setConfig(config: Config): void {
        this.config = { ...config };

        if (this.config.entity) {
            this.entity = this.config.entity.startsWith('media_player.')
                ? this.config.entity
                : 'undefined';
        }
    }

    protected willUpdate(changedProps: PropertyValues): void {
        if (changedProps.has('hass') && this.hass) {
            [this.speakersCard, this.playerCard, this.mediaCard].forEach(
                (card) => {
                    if (card) card.hass = this.hass;
                }
            );
        }
    }

    protected render(): TemplateResult {
        const renderCard = (
            card: LovelaceCard | undefined
        ): TemplateResult | typeof nothing => {
            if (!card) return nothing;
            const element = card as unknown as HTMLElement;
            return html`<div>${element}</div>`;
        };

        return html`
            <div class="container">
                ${renderCard(this.speakersCard)}
                ${renderCard(this.playerCard)} ${renderCard(this.mediaCard)}
            </div>
        `;
    }

    protected firstUpdated(): void {
        this.speakersCard = createElement(
            {
                type: 'custom:sonos-card',
                entityId: this.entity,
                heightPercentage: '100',
                widthPercentage: '100',
                showVolumeUpAndDownButtons: true,
                sections: '["volumes"]',
            },
            this.hass
        );

        this.playerCard = createElement(
            {
                type: 'custom:sonos-card',
                entityId: this.entity,
                heightPercentage: '100',
                widthPercentage: '100',
                showVolumeUpAndDownButtons: true,
                sections: '["player","groups", "grouping"]',
            },
            this.hass
        );

        this.mediaCard = createElement(
            {
                type: 'custom:sonos-card',
                heightPercentage: '100',
                widthPercentage: '100',
                mediaBrowserItemsPerRow: 3,
                mediaBrowserShowTitleForThumbnailIcons: true,
                showVolumeUpAndDownButtons: true,
                sections: '["media browser"]',
            },
            this.hass
        );
    }
}
