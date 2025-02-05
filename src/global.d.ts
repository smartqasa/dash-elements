declare module '*.css' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.webp' {
    const value: string;
    export default value;
}

declare interface DialogConfig {
    title: string;
    size?: 'normal' | 'wide' | 'fullscreen';
    timeout?: number;
    timeout_action?: object;
    dismissable?: boolean;
    dismiss_action?: object;
    autoclose?: boolean;
    content: object;
}

declare const __BUILD_VERSION__: string;
declare const __BUILD_TIMESTAMP__: string;

declare interface Window {
    browser_mod?: {
        refresh: () => void;
        service: (service: string, data?: object) => void;
    };
    customCards: Array<Object>;
    fully?: {
        bind: (event: string, action: string) => void;
        bringToForeground: () => void;
        clearCache: () => void;
        isInForeground: () => boolean;
        reboot: () => void;
        restartApp: () => void;
        startApplication: (packageName: string) => void;
        turnScreenOff: (keepAlive: boolean) => void;
        turnScreenOn: () => void;
    };
    smartqasa: {
        chipsConfig?: any;
        darkModeImage: string;
        handleScreensaverStop: () => void;
        lightModeImage: string;
        menuConfig?: any;
        menuTab: number;
        startArea?: string;
        service: (service: string, data?: object) => void;
    };
}
