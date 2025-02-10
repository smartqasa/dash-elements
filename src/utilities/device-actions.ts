import { HomeAssistant } from '../types';

function executeFullyAction(action: 'restartApp' | 'reboot'): void {
    if (!window.fully) return;

    if (!window.fully.isInForeground()) {
        window.fully.bringToForeground();
    }

    setTimeout(() => window.fully?.clearCache(), 500);
    setTimeout(() => window.fully?.[action](), 1000);
}

export const handleDeviceRefresh = (
    hass: HomeAssistant,
    deviceRefreshState: string | undefined
): string => {
    const state = hass.states['input_button.reboot_devices']?.state;
    if (deviceRefreshState === undefined || deviceRefreshState === state) {
        return state;
    }

    if (window.fully) {
        executeFullyAction('restartApp');
    } else {
        window.browser_mod?.service('refresh');
    }

    return state;
};

export const handleDeviceReboot = (
    hass: HomeAssistant,
    deviceRebootState: string | undefined
): string => {
    const state = hass.states['input_button.refresh_devices']?.state;
    if (deviceRebootState === undefined || deviceRebootState === state) {
        return state;
    }

    executeFullyAction('reboot');

    return state;
};
