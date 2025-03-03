import { HomeAssistant } from '../types';

function executeFullyAction(action: 'restartApp' | 'reboot'): void {
  if (typeof window.fully === 'undefined') return;

  if (!window.fully.isInForeground()) window.fully.bringToForeground();

  setTimeout(() => window.fully?.clearCache(), 500);
  setTimeout(() => window.fully?.[action](), 1000);
}

export const deviceRefresh = (
  hass: HomeAssistant,
  deviceRefreshState: string | undefined
): string => {
  const state = hass.states['input_button.refresh_devices']?.state;
  if (deviceRefreshState === undefined || deviceRefreshState === state) {
    return state;
  }

  if (typeof window.fully !== 'undefined') {
    executeFullyAction('restartApp');
  } else if (typeof window.browser_mod !== 'undefined') {
    window.browser_mod.service('refresh');
  }

  return state;
};

export const deviceReboot = (
  hass: HomeAssistant,
  deviceRebootState: string | undefined
): string => {
  const state = hass.states['input_button.reboot_devices']?.state;
  if (deviceRebootState === undefined || deviceRebootState === state) {
    return state;
  }

  executeFullyAction('reboot');

  return state;
};
