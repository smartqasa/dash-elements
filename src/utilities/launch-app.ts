import { appTable } from '../tables/apps';

export function launchApp(app: string, timeout?: number): void {
  const appObj = appTable[app];
  if (!appObj) {
    console.error(`App "${app}" not found in App Table.`);
    return;
  }

  if (
    typeof window.fully !== 'undefined' &&
    window.fully?.startApplication &&
    appObj.package
  ) {
    window.fully.startApplication(appObj.package);

    const timeoutMillis = (timeout ?? appObj.timeout ?? 5) * 60 * 1000;

    const appTimer = setTimeout(() => {
      if (!window.fully?.isInForeground()) {
        window.fully?.bringToForeground();
      }
    }, timeoutMillis);

    return;
  }

  if (appObj.uriScheme) {
    window.open(appObj.uriScheme, '_self');
  }
}
