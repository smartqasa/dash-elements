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
    package: string;
    uriScheme?: string;
    timeout?: number;
  };
}

export const appTable: AppTable = {
  accuweather: {
    name: 'AccuWeather',
    appIcon: accuweatherIcon,
    package: 'com.accuweather.android',
  },
  alexa: {
    name: 'Alexa',
    appIcon: alexaIcon,
    package: 'com.amazon.dee.app',
    uriScheme: 'alexa:',
  },
  amazon_music: {
    name: 'Amazon Music',
    appIcon: amazonMusicIcon,
    package: 'com.amazon.mp3',
    uriScheme: 'amznmp3:',
    timeout: 30,
  },
  amazon_shopping: {
    name: 'Amazon Shopping',
    appIcon: amazonShoppingIcon,
    package: 'com.amazon.windowshop',
    uriScheme: 'amazon:',
  },
  amcrest_smart_home: {
    name: 'Amcrest Smart Home',
    appIcon: amcrestSmartHomeIcon,
    package: 'com.mm.android.amcrestsmarthome',
  },
  apple_music: {
    name: 'Apple Music',
    appIcon: appleMusicIcon,
    package: 'com.apple.android.music',
    timeout: 30,
  },
  bmw: {
    name: 'My BMW',
    appIcon: bmwIcon,
    package: 'de.bmw.connected.mobile20.na',
    uriScheme: 'bmwconnected:',
  },
  bond: {
    name: 'Bond Home',
    appIcon: bondIcon,
    package: 'io.olibra.bondapp',
  },
  bring: {
    name: 'Bring!',
    appIcon: bringIcon,
    package: 'ch.publisheria.bring',
  },
  bu_touch: {
    name: 'BU-Touch',
    appIcon: butouchIcon,
    package: 'com.bainultra.butouch',
  },
  calculator: {
    name: 'Calculator',
    appIcon: calculatorIcon,
    package: 'com.google.android.calculator',
  },
  chatgpt: {
    name: 'ChatGPT',
    appIcon: chatgptIcon,
    package: 'com.openai.chatgpt',
  },
  clock: {
    name: 'Clock/Timer',
    appIcon: clockTimerIcon,
    package: 'com.google.android.deskclock',
  },
  doordash: {
    name: 'Doordash',
    appIcon: doordashIcon,
    package: 'com.dd.dashdash',
    uriScheme: 'doordash:',
  },
  eufy_home: {
    name: 'Eufy Clean',
    appIcon: eufyHomeIcon,
    package: 'com.eufylife.smarthome',
    uriScheme: 'eufyhome:',
  },
  eufy_security: {
    name: 'Eufy Security',
    appIcon: eufySecurityIcon,
    package: 'com.oceanwing.battery.cam',
    uriScheme: 'eufysecurity:',
  },
  fox_weather: {
    name: 'Fox Weather',
    appIcon: foxWeatherIcon,
    package: 'com.fox.weather',
  },
  google_assistant: {
    name: 'Google Assistant',
    appIcon: googleAssistantIcon,
    package: 'com.google.android.apps.googleassistant',
    uriScheme: 'googleassistant:',
  },
  google_chrome: {
    name: 'Google Chrome',
    appIcon: googleChromeIcon,
    package: 'com.android.chrome',
    uriScheme: 'googlechrome:',
  },
  google_maps: {
    name: 'Google Maps',
    appIcon: googleMapsIcon,
    package: 'com.google.android.apps.maps',
    uriScheme: 'googlemaps:',
  },
  grubhub: {
    name: 'Grubhub',
    appIcon: grubhubIcon,
    package: 'com.grubhub.android',
    uriScheme: 'grubhub:',
  },
  home_connect: {
    name: 'Home Connect',
    appIcon: homeConnectIcon,
    package: 'com.bshg.homeconnect.android.release.na',
  },
  hue: {
    name: 'Hue',
    appIcon: hueIcon,
    package: 'com.philips.lighting.hue2',
  },
  hulu: {
    name: 'Hulu',
    appIcon: huluIcon,
    package: 'com.hulu.plus',
    uriScheme: 'hulu:',
    timeout: 30,
  },
  irobot: {
    name: 'iRobot',
    appIcon: irobotIcon,
    package: 'com.irobot.home',
  },
  keurig: {
    name: 'Keurig',
    appIcon: keurigIcon,
    package: 'com.keurig.kconnect',
  },
  lionel_chief: {
    name: 'LionChief',
    appIcon: lionchiefIcon,
    package: 'com.lionel.lionchief',
  },
  lutron: {
    name: 'Lutron',
    appIcon: lutronIcon,
    package: 'com.lutron.mmw',
  },
  lyft: {
    name: 'Lyft',
    appIcon: lyftIcon,
    package: 'me.lyft.android',
    uriScheme: 'lyft:',
  },
  myq: {
    name: 'MyQ',
    appIcon: myqIcon,
    package: 'com.chamberlain.android.liftmaster.myq',
  },
  nest: {
    name: 'Nest',
    appIcon: nestIcon,
    package: 'com.nest.android',
  },
  netflix: {
    name: 'Netflix',
    appIcon: netflixIcon,
    package: 'com.netflix.mediaclient',
    uriScheme: 'nflx:',
    timeout: 30,
  },
  pandora: {
    name: 'Pandora',
    appIcon: pandoraIcon,
    package: 'com.pandora.android',
    uriScheme: 'pandora:',
    timeout: 30,
  },
  play_store: {
    name: 'Play Store',
    appIcon: playStoreIcon,
    package: 'com.android.vending',
    timeout: 30,
  },
  rachio: {
    name: 'Rachio',
    appIcon: rachioIcon,
    package: 'com.rachio.iro',
  },
  rainbird: {
    name: 'Rainbird',
    appIcon: rainbirdIcon,
    package: 'com.rainbird',
  },
  reolink: {
    name: 'Reolink',
    appIcon: reolinkIcon,
    package: 'com.mcu.reolink',
    uriScheme: 'reolink:',
  },
  ring: {
    name: 'Ring',
    appIcon: ringIcon,
    package: 'com.ringapp',
    uriScheme: 'ring:',
  },
  roku: {
    name: 'Roku',
    appIcon: rokuIcon,
    package: 'com.roku.remote',
    timeout: 30,
  },
  sense: {
    name: 'Sense Energy',
    appIcon: senseIcon,
    package: 'com.sense.androidclient',
  },
  shazam: {
    name: 'Shazam',
    appIcon: shazamIcon,
    package: 'com.shazam.android',
    uriScheme: 'shazam:',
  },
  shipt_shopper: {
    name: 'Shipt Shopper',
    appIcon: shiptShopperIcon,
    package: 'com.shipt.shopper',
  },
  sleep_number: {
    name: 'Sleep Number',
    appIcon: sleepNumberIcon,
    package: 'com.selectcomfort.SleepIQ',
  },
  solitaire: {
    name: 'Solitaire',
    appIcon: solitaireIcon,
    package: 'com.tripledot.solitaire',
    timeout: 60,
  },
  sonos: {
    name: 'Sonos',
    appIcon: sonosIcon,
    package: 'com.sonos.acr2',
    uriScheme: 'sonos:',
    timeout: 30,
  },
  spotify: {
    name: 'Spotify',
    appIcon: spotifyIcon,
    package: 'com.spotify.music',
    uriScheme: 'spotify:',
    timeout: 30,
  },
  subzero: {
    name: 'Sub-Zero Wolf',
    appIcon: subzeroIcon,
    package: 'com.subzero.group.owners.app',
  },
  tuya_smart: {
    name: 'Tuya Smart',
    appIcon: tuyaSmartIcon,
    package: 'com.tuya.smart',
    uriScheme: 'tuyasmart:',
  },
  uber: {
    name: 'Uber',
    appIcon: uberIcon,
    package: 'com.ubercab',
    uriScheme: 'uber:',
  },
  uber_eats: {
    name: 'Uber Eats',
    appIcon: uberEatsIcon,
    package: 'com.ubercab.eats',
    uriScheme: 'ubereats:',
  },
  weather: {
    name: 'Weather',
    appIcon: weatherIcon,
    package: 'com.google.android.apps.weather',
  },
  weather_channel: {
    name: 'Weather Channel',
    appIcon: weatherChannelIcon,
    package: 'com.weather.Weather',
  },
  weather_underground: {
    name: 'Weather Underground',
    appIcon: weatherUndergroundIcon,
    package: 'com.wunderground.android.weather',
  },
  yuka: {
    name: 'Yuka',
    appIcon: yukaIcon,
    package: 'io.yuka.android',
  },
  yummly: {
    name: 'Yummly Recipes',
    appIcon: yummlyIcon,
    package: 'com.yummly.android',
  },
};
