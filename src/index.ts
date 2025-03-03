// Initialize global variables
window.smartqasa = window.smartqasa || {};
window.smartqasa.startArea =
  window.smartqasa.startArea || location.pathname.split('/').pop();

import './panels/main';
import './panels/screensaver';

import './cards/areas';
import './cards/clean';
import './cards/grid-stack';
import './cards/group-stack';
import './cards/horizontal-stack';
import './cards/light-grid';
import './cards/menu';
import './cards/more-info';
import './cards/pin-verify';
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
import './tiles/custom';
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
  `%c SmartQasa ⏏ ${__BUILD_VERSION__} (Built: ${__BUILD_TIMESTAMP__}) `,
  'background-color: #0000ff; color: #ffffff; font-weight: 700;'
);
