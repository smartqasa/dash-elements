import accuweatherIcon from '../assets/app_icons/accuweather.webp';
import alexaIcon from '../assets/app_icons/alexa.webp';
import amazonMusicIcon from '../assets/app_icons/amazon_music.webp';
import amazonShoppingIcon from '../assets/app_icons/amazon_shopping.webp';
import amcrestSmartHomeIcon from '../assets/app_icons/amcrest_smart_home.webp';
import appleMusicIcon from '../assets/app_icons/apple_music.webp';
import bmwIcon from '../assets/app_icons/bmw.webp';
import bondIcon from '../assets/app_icons/bond.webp';
import bringIcon from '../assets/app_icons/bring.webp';
import butouchIcon from '../assets/app_icons/bu_touch.webp';
import calculatorIcon from '../assets/app_icons/calculator.webp';
import chatgptIcon from '../assets/app_icons/chatgpt.webp';
import clockTimerIcon from '../assets/app_icons/clock.webp';
import doordashIcon from '../assets/app_icons/doordash.webp';
import eufyHomeIcon from '../assets/app_icons/eufy_home.webp';
import eufySecurityIcon from '../assets/app_icons/eufy_security.webp';
import foxWeatherIcon from '../assets/app_icons/fox_weather.webp';
import googleAssistantIcon from '../assets/app_icons/google_assistant.webp';
import googleChromeIcon from '../assets/app_icons/google_chrome.webp';
import googleMapsIcon from '../assets/app_icons/google_maps.webp';
import grubhubIcon from '../assets/app_icons/grubhub.webp';
import homeConnectIcon from '../assets/app_icons/home_connect.webp';
import hueIcon from '../assets/app_icons/hue.webp';
import huluIcon from '../assets/app_icons/hulu.webp';
import irobotIcon from '../assets/app_icons/irobot.webp';
import keurigIcon from '../assets/app_icons/keurig.webp';
import lionchiefIcon from '../assets/app_icons/lionel_chief.webp';
import lutronIcon from '../assets/app_icons/lutron.webp';
import lyftIcon from '../assets/app_icons/lyft.webp';
import myqIcon from '../assets/app_icons/myq.webp';
import nestIcon from '../assets/app_icons/nest.webp';
import netflixIcon from '../assets/app_icons/netflix.webp';
import pandoraIcon from '../assets/app_icons/pandora.webp';
import playStoreIcon from '../assets/app_icons/play_store.webp';
import rachioIcon from '../assets/app_icons/rachio.webp';
import rainbirdIcon from '../assets/app_icons/rainbird.webp';
import reolinkIcon from '../assets/app_icons/reolink.webp';
import ringIcon from '../assets/app_icons/ring.webp';
import rokuIcon from '../assets/app_icons/roku.webp';
import senseIcon from '../assets/app_icons/sense.webp';
import shazamIcon from '../assets/app_icons/shazam.webp';
import shiptShopperIcon from '../assets/app_icons/shipt_shopper.webp';
import sleepNumberIcon from '../assets/app_icons/sleep_number.webp';
import solitaireIcon from '../assets/app_icons/solitaire.webp';
import sonosIcon from '../assets/app_icons/sonos.webp';
import spotifyIcon from '../assets/app_icons/spotify.webp';
import subzeroIcon from '../assets/app_icons/sub_zero.webp';
import tuyaSmartIcon from '../assets/app_icons/tuya_smart.webp';
import uberIcon from '../assets/app_icons/uber.webp';
import uberEatsIcon from '../assets/app_icons/uber_eats.webp';
import weatherIcon from '../assets/app_icons/weather.webp';
import weatherChannelIcon from '../assets/app_icons/weather_channel.webp';
import weatherUndergroundIcon from '../assets/app_icons/weather_underground.webp';
import yukaIcon from '../assets/app_icons/yuka.webp';
import yummlyIcon from '../assets/app_icons/yummly.webp';

interface AppTable {
  [key: string]: {
    name: string;
    appIcon: string;
    launcher: 'package' | 'uri';
    package: string;
    uriScheme?: string;
    timeout?: number;
  };
}

export const appTable: AppTable = {
  accuweather: {
    name: 'AccuWeather',
    appIcon: accuweatherIcon,
    launcher: 'package',
    package: 'com.accuweather.android',
  },
  alexa: {
    name: 'Alexa',
    appIcon: alexaIcon,
    launcher: 'package',
    package: 'com.amazon.dee.app',
    uriScheme: 'alexa:',
  },
  amazon_music: {
    name: 'Amazon Music',
    appIcon: amazonMusicIcon,
    launcher: 'uri',
    package: 'com.amazon.mp3',
    uriScheme: 'amznmp3:',
    timeout: 30,
  },
  amazon_shopping: {
    name: 'Amazon Shopping',
    appIcon: amazonShoppingIcon,
    launcher: 'uri',
    package: 'com.amazon.windowshop',
    uriScheme: 'amazon:',
  },
  amcrest_smart_home: {
    name: 'Amcrest Smart Home',
    appIcon: amcrestSmartHomeIcon,
    launcher: 'package',
    package: 'com.mm.android.amcrestsmarthome',
  },
  apple_music: {
    name: 'Apple Music',
    appIcon: appleMusicIcon,
    launcher: 'package',
    package: 'com.apple.android.music',
    timeout: 30,
  },
  bmw: {
    name: 'My BMW',
    appIcon: bmwIcon,
    launcher: 'package',
    package: 'de.bmw.connected.mobile20.na',
    uriScheme: 'bmwconnected:',
  },
  bond: {
    name: 'Bond Home',
    appIcon: bondIcon,
    launcher: 'package',
    package: 'io.olibra.bondapp',
    uriScheme: '',
  },
  bring: {
    name: 'Bring!',
    appIcon: bringIcon,
    launcher: 'package',
    package: 'ch.publisheria.bring',
    uriScheme: '',
  },
  bu_touch: {
    name: 'BU-Touch',
    appIcon: butouchIcon,
    launcher: 'package',
    package: 'com.bainultra.butouch',
    uriScheme: '',
  },
  calculator: {
    name: 'Calculator',
    appIcon: calculatorIcon,
    launcher: 'package',
    package: 'com.google.android.calculator',
    uriScheme: '',
  },
  chatgpt: {
    name: 'ChatGPT',
    appIcon: chatgptIcon,
    launcher: 'package',
    package: 'com.openai.chatgpt',
    uriScheme: '',
  },
  clock: {
    name: 'Clock/Timer',
    appIcon: clockTimerIcon,
    launcher: 'package',
    package: 'com.google.android.deskclock',
    uriScheme: '',
  },
  doordash: {
    name: 'Doordash',
    appIcon: doordashIcon,
    launcher: 'uri',
    package: 'com.dd.dashdash',
    uriScheme: 'doordash:',
  },
  eufy_home: {
    name: 'Eufy Clean',
    appIcon: eufyHomeIcon,
    launcher: 'uri',
    package: 'com.eufylife.smarthome',
    uriScheme: 'eufyhome:',
  },
  eufy_security: {
    name: 'Eufy Security',
    appIcon: eufySecurityIcon,
    launcher: 'package',
    package: 'com.oceanwing.battery.cam',
    uriScheme: 'eufysecurity:',
  },
  fox_weather: {
    name: 'Fox Weather',
    appIcon: foxWeatherIcon,
    launcher: 'package',
    package: 'com.fox.weather',
  },
  google_assistant: {
    name: 'Google Assistant',
    appIcon: googleAssistantIcon,
    launcher: 'package',
    package: 'com.google.android.apps.googleassistant',
    uriScheme: 'googleassistant:',
  },
  google_chrome: {
    name: 'Google Chrome',
    appIcon: googleChromeIcon,
    launcher: 'package',
    package: 'com.android.chrome',
    uriScheme: 'googlechrome:',
  },
  google_maps: {
    name: 'Google Maps',
    appIcon: googleMapsIcon,
    launcher: 'package',
    package: 'com.google.android.apps.maps',
    uriScheme: 'googlemaps:',
  },
  grubhub: {
    name: 'Grubhub',
    appIcon: grubhubIcon,
    launcher: 'package',
    package: 'com.grubhub.android',
    uriScheme: 'grubhub:',
  },
  home_connect: {
    name: 'Home Connect',
    appIcon: homeConnectIcon,
    launcher: 'package',
    package: 'com.bshg.homeconnect.android.release.na',
    uriScheme: '',
  },
  hue: {
    name: 'Hue',
    appIcon: hueIcon,
    launcher: 'package',
    package: 'com.philips.lighting.hue2',
    uriScheme: '',
  },
  hulu: {
    name: 'Hulu',
    appIcon: huluIcon,
    launcher: 'uri',
    package: 'com.hulu.plus',
    uriScheme: 'hulu:',
    timeout: 30,
  },
  irobot: {
    name: 'iRobot',
    appIcon: irobotIcon,
    launcher: 'package',
    package: 'com.irobot.home',
    uriScheme: '',
  },
  keurig: {
    name: 'Keurig',
    appIcon: keurigIcon,
    launcher: 'package',
    package: 'com.keurig.kconnect',
    uriScheme: '',
  },
  lionel_chief: {
    name: 'LionChief',
    appIcon: lionchiefIcon,
    launcher: 'package',
    package: 'com.lionel.lionchief',
    uriScheme: '',
  },
  lutron: {
    name: 'Lutron',
    appIcon: lutronIcon,
    launcher: 'package',
    package: 'com.lutron.mmw',
    uriScheme: '',
  },
  lyft: {
    name: 'Lyft',
    appIcon: lyftIcon,
    launcher: 'uri',
    package: 'me.lyft.android',
    uriScheme: 'lyft://',
  },
  myq: {
    name: 'MyQ',
    appIcon: myqIcon,
    launcher: 'package',
    package: 'com.chamberlain.android.liftmaster.myq',
    uriScheme: '',
  },
  nest: {
    name: 'Nest',
    appIcon: nestIcon,
    launcher: 'package',
    package: 'com.nest.android',
    uriScheme: '',
  },
  netflix: {
    name: 'Netflix',
    appIcon: netflixIcon,
    launcher: 'uri',
    package: 'com.netflix.mediaclient',
    uriScheme: 'nflx:',
    timeout: 30,
  },
  pandora: {
    name: 'Pandora',
    appIcon: pandoraIcon,
    launcher: 'uri',
    package: 'com.pandora.android',
    uriScheme: 'pandora:',
    timeout: 30,
  },
  play_store: {
    name: 'Play Store',
    appIcon: playStoreIcon,
    launcher: 'package',
    package: 'com.android.vending',
    uriScheme: '',
    timeout: 30,
  },
  rachio: {
    name: 'Rachio',
    appIcon: rachioIcon,
    launcher: 'package',
    package: 'com.rachio.iro',
    uriScheme: '',
  },
  rainbird: {
    name: 'Rainbird',
    appIcon: rainbirdIcon,
    launcher: 'package',
    package: 'com.rainbird',
    uriScheme: '',
  },
  reolink: {
    name: 'Reolink',
    appIcon: reolinkIcon,
    launcher: 'package',
    package: 'com.mcu.reolink',
    uriScheme: 'reolink:',
  },
  ring: {
    name: 'Ring',
    appIcon: ringIcon,
    launcher: 'package',
    package: 'com.ringapp',
    uriScheme: 'ring:',
  },
  roku: {
    name: 'Roku',
    appIcon: rokuIcon,
    launcher: 'package',
    package: 'com.roku.remote',
    uriScheme: '',
    timeout: 30,
  },
  sense: {
    name: 'Sense Energy',
    appIcon: senseIcon,
    launcher: 'package',
    package: 'com.sense.androidclient',
    uriScheme: '',
  },
  shazam: {
    name: 'Shazam',
    appIcon: shazamIcon,
    launcher: 'uri',
    package: 'com.shazam.android',
    uriScheme: 'shazam:',
  },
  shipt_shopper: {
    name: 'Shipt Shopper',
    appIcon: shiptShopperIcon,
    launcher: 'package',
    package: 'com.shipt.shopper',
    uriScheme: '',
  },
  sleep_number: {
    name: 'Sleep Number',
    appIcon: sleepNumberIcon,
    launcher: 'package',
    package: 'com.selectcomfort.SleepIQ',
    uriScheme: '',
  },
  solitaire: {
    name: 'Solitaire',
    appIcon: solitaireIcon,
    launcher: 'package',
    package: 'com.tripledot.solitaire',
    uriScheme: '',
    timeout: 60,
  },
  sonos: {
    name: 'Sonos',
    appIcon: sonosIcon,
    launcher: 'uri',
    package: 'com.sonos.acr2',
    uriScheme: 'sonos:',
    timeout: 30,
  },
  spotify: {
    name: 'Spotify',
    appIcon: spotifyIcon,
    launcher: 'uri',
    package: 'com.spotify.music',
    uriScheme: 'spotify:',
    timeout: 30,
  },
  subzero: {
    name: 'Sub-Zero Wolf',
    appIcon: subzeroIcon,
    launcher: 'package',
    package: 'com.subzero.group.owners.app',
  },
  tuya_smart: {
    name: 'Tuya Smart',
    appIcon: tuyaSmartIcon,
    launcher: 'uri',
    package: 'com.tuya.smart',
    uriScheme: 'tuyasmart:',
  },
  uber: {
    name: 'Uber',
    appIcon: uberIcon,
    launcher: 'uri',
    package: 'com.ubercab',
    uriScheme: 'uber:',
  },
  uber_eats: {
    name: 'Uber Eats',
    appIcon: uberEatsIcon,
    launcher: 'uri',
    package: 'com.ubercab.eats',
    uriScheme: 'ubereats:',
  },
  weather: {
    name: 'Weather',
    appIcon: weatherIcon,
    launcher: 'package',
    package: 'com.google.android.apps.weather',
    uriScheme: '',
  },
  weather_channel: {
    name: 'Weather Channel',
    appIcon: weatherChannelIcon,
    launcher: 'package',
    package: 'com.weather.Weather',
    uriScheme: '',
  },
  weather_underground: {
    name: 'Weather Underground',
    appIcon: weatherUndergroundIcon,
    launcher: 'package',
    package: 'com.wunderground.android.weather',
    uriScheme: '',
  },
  yuka: {
    name: 'Yuka',
    appIcon: yukaIcon,
    launcher: 'package',
    package: 'io.yuka.android',
    uriScheme: '',
  },
  yummly: {
    name: 'Yummly Recipes',
    appIcon: yummlyIcon,
    launcher: 'package',
    package: 'com.yummly.android',
    uriScheme: '',
  },
};
