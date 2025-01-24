import { HomeAssistant, LovelaceCardConfig, LovelaceCard } from '../types';
import { createElement } from './create-element';

export const createElements = (
    config: LovelaceCardConfig[] | undefined,
    hass: HomeAssistant
): LovelaceCard[] => {
    if (!Array.isArray(config)) {
        console.error("Error: 'config' is not an array:", config);
        return [];
    }

    if (config.length === 0) return [];

    return config.map((elementConfig) => {
        const element = createElement(elementConfig, hass) as LovelaceCard;
        return element;
    });
};
