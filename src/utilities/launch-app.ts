import { appTable } from '../tables/apps';

export function launchApp(app: string, timeout?: number): Promise<boolean> {
  return new Promise((resolve) => {
    const appObj = appTable[app];
    if (!appObj) {
      console.error(`App "${app}" not found in App Table.`);
      return resolve(false);
    }

    if (
      typeof window.fully !== 'undefined' &&
      window.fully?.startApplication &&
      appObj.package
    ) {
      window.fully.startApplication(appObj.package);
    } else if (appObj.uriScheme) {
      window.open(appObj.uriScheme, '_self');
    } else {
      console.error(`App "${app}" has no package or URI Scheme.`);
      return resolve(false);
    }

    const timeoutMillis = (timeout ?? appObj.timeout ?? 5) * 60 * 1000;
    setTimeout(() => {
      if (!window.fully?.isInForeground()) {
        window.fully?.bringToForeground();
      }
    }, timeoutMillis);

    setTimeout(() => {
      const isNowBackground = !window.fully?.isInForeground();
      return resolve(isNowBackground);
    }, 1000);
  });
}
