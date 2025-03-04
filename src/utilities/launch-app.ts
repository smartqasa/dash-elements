import { appTable } from '../tables/apps';

export function launchApp(app: string, timeout?: number): void {
  const appObj = appTable[app];
  if (!appObj) {
    console.error(`App "${app}" not found in App Table.`);
    return;
  }

  const timeoutSecs = timeout ?? 300;

  if (typeof window.fully !== 'undefined') {
    window.fully.startApplication(appObj.package);
    window.fully.setStringSetting('timeToRegainFocus', timeoutSecs.toString());

    setTimeout(() => {
      const isInForeground = !!window.fully?.isInForeground();
      if (isInForeground) {
        console.error(`App "${app}" failed to launch.`);
        window.fully?.setStringSetting('timeToRegainFocus', '0');
        return;
      }

      setTimeout(() => {
        const isInForeground = !!window.fully?.isInForeground();
        if (!isInForeground) {
          window.fully?.bringToForeground();
          window.fully?.setStringSetting('timeToRegainFocus', '0');
        }
      }, timeoutSecs * 1000);
    }, 1000);

    return;
  }

  if (appObj.uriScheme) {
    window.open(appObj.uriScheme, '_self');
    return;
  }

  console.error(`App "${app}" has no package or URI Scheme.`);
}
