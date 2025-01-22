// Initialize global variables
window.smartqasa = window.smartqasa || {};
window.smartqasa.isInitializing = true;
window.smartqasa.lightModeImage = lightModeImage;
window.smartqasa.darkModeImage = darkModeImage;
window.smartqasa.startArea =
    window.smartqasa.startArea || location.pathname.split('/').pop();
window.smartqasa.version = __BUILD_VERSION__;
window.smartqasa.timestamp = __BUILD_TIMESTAMP__;

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

import './panel/panel';

import './cards/areas';
import './cards/clean';
import './cards/grid-stack';
import './cards/group-stack';
import './cards/horizontal-stack';
import './cards/light-grid';
import './cards/menu';
import './cards/more-info';
import './cards/pin-verify';
import './cards/screensaver';
import './cards/vertical-stack';
import './cards/tv-remote';
import './cards/weather';

import './chips/admin';
import './chips/audio';
import './chips/custom';
import './chips/dialog';
import './chips/motion';
import './chips/navigate';
import './chips/routine';
import './chips/select';
import './chips/thermostat';
import './chips/weather';
import './chips/webpage';

import './tiles/action';
import './tiles/all-off';
import './tiles/app';
import './tiles/area';
import './tiles/audio';
import './tiles/dialog';
import './tiles/fan';
import './tiles/garage';
import './tiles/heater';
import './tiles/light';
import './tiles/light-editor';
import './tiles/lock';
import './tiles/option';
import './tiles/robot';
import './tiles/roku';
import './tiles/routine';
import './tiles/select';
import './tiles/sensor';
import './tiles/pool-light';
import './tiles/pool-light-sequencer';
import './tiles/shade';
import './tiles/switch';
import './tiles/theme';
import './tiles/thermostat';
import './tiles/webpage';

console.info(
    `%c SmartQasa ⏏ ${window.smartqasa.version} (Built: ${window.smartqasa.timestamp}) `,
    'background-color: #0000ff; color: #ffffff; font-weight: 700;'
);
