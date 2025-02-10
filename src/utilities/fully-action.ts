export function executeFullyAction(action: 'restartApp' | 'reboot'): void {
    if (!window.fully) return;

    if (!window.fully.isInForeground()) {
        window.fully.bringToForeground();
    }

    setTimeout(() => window.fully?.clearCache(), 500);
    setTimeout(() => window.fully?.[action](), 1000);
}
