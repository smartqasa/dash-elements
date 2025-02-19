export const SS_HIDE_EVENTS = [
    'keypress',
    'mousemove',
    'orientationchange',
    'resize',
    'touchstart',
] as const;
export const SS_IDLE_TIMER = 300000; // 10 seconds
export const SS_CYCLE_TIMER = 30000; // 15 seconds

export const heaterColors: Record<string, string> = {
    electric: 'var(--sq-climate-heat-rgb, 250, 67, 54)',
    heating: 'var(--sq-climate-heat-rgb, 250, 67, 54)',
    idle: 'var(--sq-idle-rgb, 128, 128, 128)',
    off: 'var(--sq-inactive-rgb, 128, 128, 128)',
    default: 'var(--sq-unavailable-rgb, 255, 0, 255)',
};

export const modeIcons: Record<string, string> = {
    Away: 'hass:map-marker-radius',
    Closed: 'hass:calendar-remove',
    Entertain: 'hass:glass-cocktail',
    Guest: 'hass:account-multiple',
    Home: 'hass:home-account',
    Private: 'hass:party-popper',
    Regular: 'hass:calendar-check',
    Special: 'hass:calendar-star',
    Vacation: 'hass:airplane',
    default: 'hass:help-rhombus',
};

export const phaseIcons: Record<string, string> = {
    Prep: 'hass:chef-hat',
    Morning: 'hass:weather-sunset-up',
    Day: 'hass:white-balance-sunny',
    Evening: 'hass:weather-night',
    Clean: 'hass:broom',
    Night: 'hass:sleep',
    Closed: 'hass:sleep',
    default: 'hass:help-rhombus',
};

export const thermostatColors: Record<string, string> = {
    cooling: 'var(--sq-climate-cool-rgb, 3, 169, 244)',
    heating: 'var(--sq-climate-heat-rgb, 250, 67, 54)',
    fan_only: 'var(--sq-climate-fan_only-rgb, 0, 255, 0)',
    idle: 'var(--sq-idle-rgb, 128, 128, 128)',
    off: 'var(--sq-inactive-rgb, 128, 128, 128)',
    default: 'var(--sq-unavailable-rgb, 255, 0, 255)',
};

export const thermostatIcons: Record<string, string> = {
    auto: 'hass:thermostat-auto',
    cool: 'hass:snowflake',
    heat: 'hass:fire',
    heat_cool: 'hass:sun-snowflake-variant',
    off: 'hass:power',
    default: 'hass:thermostat-cog',
};
