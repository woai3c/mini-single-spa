function isPromise(fn) {
    if ((typeof fn === 'object' || typeof fn === 'function') && typeof fn.then === 'function') {
        return true;
    }
}
function $(selector) {
    return document.querySelector(selector);
}

/* eslint-disable array-callback-return */
const urlReg = /^http(s)?:\/\//;
function isCorrectURL(url = '') {
    return urlReg.test(url);
}
// 匹配域名
const hostReg = /(?<=:\/\/)[^/]*/;
function getHost(url) {
    return url.match(hostReg)?.[0] || '';
}
const hasLoadedURLs = [];
async function parseHTMLandloadSources(url) {
    if (!isCorrectURL(url))
        return;
    let html;
    try {
        html = await loadSourceText(url); // load html
    }
    catch (error) {
        throw error;
    }
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(html, 'text/html');
    const scripts = Array.from(doc.querySelectorAll('script')).map(script => {
        const src = script.src;
        // 防止加载重复的 url
        if (src && !hasLoadedURLs.includes(src)) {
            hasLoadedURLs.push(src);
            return src;
        }
    }).filter(Boolean);
    const host = getHost(url);
    const linkPromises = Array.from(doc.querySelectorAll('link')).map(link => {
        const href = link.href;
        // 1. preload 的资源一般和真正的资源成对出现, 因此不需要加载含有 preload 的资源
        // 2. 防止加载重复的 url
        // 3. 只加载与子应用域名一致的 url
        if (href
            && href.includes(host)
            && link.rel !== 'preload'
            && !hasLoadedURLs.includes(href)) {
            hasLoadedURLs.push(href);
            return loadLink(href, link.attributes);
        }
    }).filter(Boolean);
    // 异步加载 link script 标签，顺序执行 js
    return Promise.all([...linkPromises, syncLoadScripts(scripts)]);
}
function loadSourceText(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = (res) => {
            resolve(res.target.response);
        };
        xhr.onerror = reject;
        xhr.onabort = reject;
        xhr.open('get', url);
        xhr.send();
    });
}
const sourceReg = /\.css$/;
const head = $('head');
function loadLink(url, attrs) {
    return new Promise((resolve, reject) => {
        const source = document.createElement('link');
        Array.from(attrs).forEach(attr => {
            source.setAttribute(attr.name, attr.value);
        });
        source.onload = resolve;
        source.onerror = reject;
        head.appendChild(source);
        // 如果不是 css 或者 js(prefetch)，马上 resolve
        if (!sourceReg.test(url)) {
            setTimeout(resolve);
        }
    });
}
// 异步加载 js 资源，顺序执行
async function syncLoadScripts(urls) {
    try {
        const scriptTexts = await Promise.all(urls.map(url => loadSourceText(url)));
        scriptTexts.forEach(text => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.innerHTML = text;
            head.appendChild(script);
        });
    }
    catch (error) {
        throw error;
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
    AppStatus["BOOTSTRAP_ERROR"] = "BOOTSTRAP_ERROR";
    AppStatus["MOUNT_ERROR"] = "MOUNT_ERROR";
    AppStatus["UNMOUNT_ERROR"] = "UNMOUNT_ERROR";
})(AppStatus || (AppStatus = {}));

async function bootstrapApp(app) {
    try {
        // 加载 js css
        await parseHTMLandloadSources(app.pageEntry);
    }
    catch (error) {
        throw error;
    }
    const { bootstrap, mount, unmount } = await getLifeCycleFuncs(app.name);
    validateLifeCycleFunc('bootstrap', bootstrap);
    validateLifeCycleFunc('mount', mount);
    validateLifeCycleFunc('unmount', unmount);
    app.bootstrap = bootstrap;
    app.mount = mount;
    app.unmount = unmount;
    try {
        app.props = await getProps(app.props);
    }
    catch (err) {
        app.status = AppStatus.BOOTSTRAP_ERROR;
        throw err;
    }
    let result = app.bootstrap({ props: app.props, container: app.container });
    if (!isPromise(result)) {
        result = Promise.resolve(result);
    }
    return result
        .then(() => {
        app.status = AppStatus.BOOTSTRAPPED;
    })
        .catch((err) => {
        app.status = AppStatus.BOOTSTRAP_ERROR;
        throw err;
    });
}
async function getProps(props) {
    if (typeof props === 'function')
        return props();
    if (typeof props === 'object')
        return props;
    return {};
}
function validateLifeCycleFunc(name, fn) {
    if (typeof fn !== 'function') {
        throw Error(`The "${name}" must be a function`);
    }
}
async function getLifeCycleFuncs(name) {
    const result = window[`mini-single-spa-${name}`];
    if (typeof result === 'function') {
        return result();
    }
    if (typeof result === 'object') {
        return result;
    }
    throw Error(`The micro app must inject the lifecycle("bootstrap" "mount" "unmount") into window['mini-single-spa-${name}']`);
}

function mountApp(app) {
    app.status = AppStatus.BEFORE_MOUNT;
    let result = app.mount({ props: app.props, container: app.container });
    if (!isPromise(result)) {
        result = Promise.resolve(result);
    }
    return result
        .then(() => {
        app.status = AppStatus.MOUNTED;
    })
        .catch((err) => {
        app.status = AppStatus.MOUNT_ERROR;
        throw err;
    });
}

function unMountApp(app) {
    app.status = AppStatus.BEFORE_UNMOUNT;
    let result = app.unmount({ props: app.props, container: app.container });
    if (!isPromise(result)) {
        result = Promise.resolve(result);
    }
    return result
        .then(() => {
        app.status = AppStatus.UNMOUNTED;
    })
        .catch((err) => {
        app.status = AppStatus.UNMOUNT_ERROR;
        throw err;
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
        try {
            loadApps();
        }
        catch (error) {
            throw error;
        }
    }
}

// 是否运行在 single spa 下
window.__IS_SINGLE_SPA__ = true;
overwriteEventsAndHistory();

export { registerApplication, start };
//# sourceMappingURL=mini-single-spa.esm.js.map
