import { appTable } from '../tables/apps';

export async function launchApp(
  app: string,
  timeout?: number
): Promise<boolean> {
  const appObj = appTable[app];
  if (!appObj) {
    console.error(`App "${app}" not found in App Table.`);
    return false;
  }

  const timeoutSecs = timeout ?? appObj.timeout ?? 120;

  if (typeof window.fully !== 'undefined') {
    window.fully.startApplication(appObj.package);
    window.fully.setStringSetting('timeToRegainFocus', timeoutSecs.toString());

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (window.fully.isInForeground()) {
      console.error(`App "${app}" failed to launch.`);
      window.fully.setStringSetting('timeToRegainFocus', '0');
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, timeoutSecs * 1000));

    if (!window.fully.isInForeground()) {
      window.fully.bringToForeground();
      window.fully.setStringSetting('timeToRegainFocus', '0');
    }

    return true;
  }

  if (appObj.uriScheme) {
    window.open(appObj.uriScheme, '_self');
    return true;
  }

  console.error(`App "${app}" has no package or URI Scheme.`);
  return false;
}
