import { HomeAssistant } from '../types';

export async function callService(
  hass: HomeAssistant | undefined,
  domain: string,
  service: string,
  data?: Record<string, any>,
  target?: Record<string, any>
): Promise<void> {
  if (!hass) {
    throw new Error('Home Assistant instance is not available');
  }
  try {
    await hass.callService(domain, service, data, target);
  } catch (error) {
    console.error(`Service call failed: ${domain}.${service}`, error);
    throw error;
  }
}
