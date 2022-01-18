function isPromise(func) {
    if (typeof func === 'function' && typeof func.then === 'function') {
        return true;
    }
}

var AppStatus;
(function (AppStatus) {
    AppStatus["BEFORE_BOOTSTRAP"] = "BEFORE_BOOTSTRAP";
    AppStatus["BOOTSTRAPPED"] = "BOOTSTRAPPED";
    AppStatus["BEFORE_MOUNT"] = "BEFORE_MOUNT";
    AppStatus["MOUNTED"] = "MOUNTED";
    AppStatus["BEFORE_UNMOUNT"] = "BEFORE_UNMOUNT";
    AppStatus["UNMOUNTED"] = "UNMOUNTED";
    AppStatus["LOAD_ERROR"] = "LOAD_ERROR";
    AppStatus["SKIP_BECAUSE_BROKEN"] = "SKIP_BECAUSE_BROKEN";
})(AppStatus || (AppStatus = {}));

async function bootstrapApp(app) {
    const { bootstrap, mount, unmount } = await app.loadApp();
    if (isPromise(bootstrap) && isPromise(mount) && isPromise(unmount)) {
        throw Error('The lifecycle function must be a Promise');
    }
    app.bootstrap = bootstrap;
    app.mount = mount;
    app.unmount = unmount;
    return app.bootstrap().then(() => {
        app.status = AppStatus.BOOTSTRAPPED;
    });
}

function mountApp(app) {
    app.status = AppStatus.BEFORE_MOUNT;
    return app.mount(app.customProps || {}).then(() => {
        app.status = AppStatus.MOUNTED;
    });
}

function unMountApp(app) {
    app.status = AppStatus.BEFORE_UNMOUNT;
    return app.unmount(app.customProps || {}).then(() => {
        app.status = AppStatus.UNMOUNTED;
    });
}

const apps = [];
async function loadApps() {
    const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP);
    const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED);
    const loadPromise = toLoadApp.map(bootstrapApp);
    const unMountPromise = toUnMountApp.map(unMountApp);
    await Promise.all([...loadPromise, ...unMountPromise]);
    const toMountApp = [
        ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
        ...getAppsWithStatus(AppStatus.UNMOUNTED),
    ];
    await toMountApp.map(mountApp);
}
function getAppsWithStatus(status) {
    const result = [];
    apps.forEach(app => {
        // tobootstrap or tomount
        if (isActive(app) && app.status === status) {
            switch (app.status) {
                case AppStatus.BEFORE_BOOTSTRAP:
                case AppStatus.BOOTSTRAPPED:
                case AppStatus.UNMOUNTED:
                    result.push(app);
                    break;
            }
        }
        else if (app.status === AppStatus.MOUNTED && status === AppStatus.MOUNTED) {
            // tounmount
            result.push(app);
        }
    });
    return result;
}
function isActive(app) {
    return typeof app.activeRule === 'function' && app.activeRule(window.location);
}

const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
function overwriteEventsAndHistory() {
    window.history.pushState = function (state, title, url) {
        const result = originalPushState.call(this, state, title, url);
        loadApps();
        return result;
    };
    window.history.replaceState = function (state, title, url) {
        const result = originalReplaceState.call(this, state, title, url);
        loadApps();
        return result;
    };
    window.addEventListener('popstate', () => {
        loadApps();
    }, true);
    window.addEventListener('hashchange', () => {
        loadApps();
    }, true);
}

function registerApplication(app) {
    if (typeof app.activeRule === 'string') {
        const path = app.activeRule;
        app.activeRule = (location = window.location) => location.pathname === path;
    }
    app.status = AppStatus.BEFORE_BOOTSTRAP;
    apps.push(app);
}

let isStarted = false;
function start() {
    if (!isStarted) {
        isStarted = true;
        loadApps();
    }
}

// 是否运行在 single spa 下
window.__IS_SINGLE_SPA__ = true;
overwriteEventsAndHistory();

export { registerApplication, start };
//# sourceMappingURL=single-spa.esm.js.map
