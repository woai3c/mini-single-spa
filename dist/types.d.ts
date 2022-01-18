export interface AnyObject {
    [key: string]: any;
}
export declare enum AppStatus {
    BEFORE_BOOTSTRAP = "BEFORE_BOOTSTRAP",
    BOOTSTRAPPED = "BOOTSTRAPPED",
    BEFORE_MOUNT = "BEFORE_MOUNT",
    MOUNTED = "MOUNTED",
    BEFORE_UNMOUNT = "BEFORE_UNMOUNT",
    UNMOUNTED = "UNMOUNTED",
    LOAD_ERROR = "LOAD_ERROR",
    SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN"
}
export interface Application {
    name: string;
    activeRule: Function | string;
    customProps: AnyObject;
    host?: string;
    status?: AppStatus;
    loadApp: () => Promise<any>;
    bootstrap?: () => Promise<any>;
    mount?: (props: AnyObject) => Promise<any>;
    unmount?: (props: AnyObject) => Promise<any>;
}
