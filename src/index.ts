// Initialize global variables
window.smartqasa = window.smartqasa || {};
window.smartqasa.lightModeImage = lightModeImage;
window.smartqasa.darkModeImage = darkModeImage;
window.smartqasa.startArea =
    window.smartqasa.startArea || location.pathname.split('/').pop();
window.smartqasa.version = __BUILD_VERSION__; // Injected version
window.smartqasa.timestamp = __BUILD_TIMESTAMP__; // Injected timestamp

window.customCards = window.customCards ?? [];

// Utility Imports
import { loadYamlAsJson } from './utilities/load-yaml-as-json';
import { LovelaceCardConfig } from './types';

// Preload background images
import lightModeImage from './assets/backgrounds/background_light.jpg';
import darkModeImage from './assets/backgrounds/background_dark.jpg';

const preloadImages = [lightModeImage, darkModeImage];
preloadImages.forEach((src) => {
    const img = new Image();
    img.onload = () => console.info(`Preloaded image: ${src}`);
    img.onerror = () => console.warn(`Failed to preload image: ${src}`);
    img.src = src;
});

// Preload YAML configuration
(async () => {
    const yamlFilePath = '/local/smartqasa/config/chips.yaml';
    try {
        const chipsConfig =
            await loadYamlAsJson<LovelaceCardConfig[]>(yamlFilePath);
        window.smartqasa.chipsConfig = chipsConfig;
    } catch (error) {
        console.error('Failed to preload chips config:', error);
    }
})();

// Load modules
(async () => {
    const cards = [
        './cards/areas',
        './cards/clean',
        './cards/grid-stack',
        './cards/group-stack',
        './cards/horizontal-stack',
        './cards/light-grid',
        './cards/menu',
        './cards/more-info',
        './cards/pin-verify',
        './cards/screensaver',
        './cards/vertical-stack',
        './cards/tv-remote',
        './cards/weather',
    ];

    const chips = [
        './chips/admin',
        './chips/audio',
        './chips/custom',
        './chips/dialog',
        './chips/motion',
        './chips/navigate',
        './chips/routine',
        './chips/select',
        './chips/thermostat',
        './chips/weather',
        './chips/webpage',
    ];

    const tiles = [
        './tiles/action',
        './tiles/all-off',
        './tiles/app',
        './tiles/area',
        './tiles/audio',
        './tiles/dialog',
        './tiles/fan',
        './tiles/garage',
        './tiles/heater',
        './tiles/light',
        './tiles/light-editor',
        './tiles/lock',
        './tiles/option',
        './tiles/robot',
        './tiles/roku',
        './tiles/routine',
        './tiles/select',
        './tiles/sensor',
        './tiles/pool-light',
        './tiles/pool-light-sequencer',
        './tiles/shade',
        './tiles/switch',
        './tiles/theme',
        './tiles/thermostat',
        './tiles/webpage',
    ];

    try {
        await Promise.all([
            import('./panel/panel'),
            ...cards.map((path) => import(path)),
            ...chips.map((path) => import(path)),
            ...tiles.map((path) => import(path)),
        ]);

        console.info(
            `%c SmartQasa ⏏ ${window.smartqasa.version} (Built: ${window.smartqasa.timestamp}) `,
            'background-color: #0000ff; color: #ffffff; font-weight: 700;'
        );
    } catch (error) {
        console.error('Error loading modules:', error);
    }
})();
