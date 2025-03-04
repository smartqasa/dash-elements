import { appTable } from '../tables/apps';

export function launchApp(app: string, timeout?: number): void {
  const appObj = appTable[app];
  if (!appObj) {
    console.error(`App "${app}" not found in App Table.`);
    return;
  }

  const timeoutMins = timeout ?? appObj.timeout ?? 5;

  if (typeof window.fully !== 'undefined') {
    window.fully.startApplication(appObj.package);

    setTimeout(() => {
      const isInForeground = !!window.fully?.isInForeground();

      if (isInForeground) {
        console.error(`App "${app}" failed to launch.`);
        return;
      }

      const timeoutSecs = (timeoutMins * 60).toString();
      window.fully?.setStringSetting('timeToRegainFocus', timeoutSecs);

      const timeoutMillis = timeoutMins * 60 * 1000;
      setTimeout(() => {
        if (!window.fully?.isInForeground()) {
          window.fully?.bringToForeground();
        }
      }, timeoutMillis);
    }, 500);

    return;
  }

  if (appObj.uriScheme) {
    window.open(appObj.uriScheme, '_self');
    return;
  }

  console.error(`App "${app}" has no package or URI Scheme.`);
}
