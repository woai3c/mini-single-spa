import Sandbox from './sandbox/Sandbox'

export interface AnyObject {
    [key: string]: any
}

export type MicroWindow = Window & any

/**
 * app 的状态集合
 */
export enum AppStatus {
    BEFORE_BOOTSTRAP = 'BEFORE_BOOTSTRAP',
    BOOTSTRAPPED = 'BOOTSTRAPPED',
    BEFORE_MOUNT = 'BEFORE_MOUNT',
    MOUNTED = 'MOUNTED',
    BEFORE_UNMOUNT = 'BEFORE_UNMOUNT',
    UNMOUNTED = 'UNMOUNTED',
    BOOTSTRAP_ERROR = 'BOOTSTRAP_ERROR',
    MOUNT_ERROR = 'MOUNT_ERROR',
    UNMOUNT_ERROR = 'UNMOUNT_ERROR',
}

/**
 * script css 的资源属性
 */
export interface Source {
    /**
     * 是否全局资源
     */
    isGlobal: boolean
    /**
     * 资源的 url
     */
    url?: string
    /**
     * 资源的内容，如果 url 有值，则忽略该属性
     */
    value: string
    /**
     * script 的类型
     */
    type?: string | null
}

export interface Application {
    /**
     * app 名称
     */
    name: string
    /**
     * app 匹配规则，值为 true 时加载 app
     * 例如传入 /vue，当 url 的路径变为 /vue 时，激活当前子应用。
     * 如果 activeRule 为函数，则会传入 location 作为参数，activeRule(location) 返回 true 时，激活当前子应用。
     */
    activeRule: Function | string
    /**
     * 父应用传过来的自定义属性
     */
    props: Function | AnyObject
    /**
     * app 挂载的 dom
     */
    container: HTMLElement
    /**
     * app 访问入口，一个 URL 链接
     */
    pageEntry: string
    /**
     * app 入口页面的 html 内容（body 部分）
     */
    pageBody: string
    /**
     * enabled: 是否开启 js 作用域隔离、元素隔离，默认开启
     * css: 是否开启样式隔离，默认关闭
     */
    sandboxConfig: { enabled: boolean, css: boolean }
    /**
     * app 的 js 运行沙箱
     */
    sandbox: Sandbox
    /**
     * app 当前状态
     */
    status: AppStatus
    /**
     * app 已经加载过的 url，用于去重
     */
    loadedURLs: string[]
    /**
     * app 所有的非全局 style，当 app 加载时需要添加到页面中
     */
    styles: string[] | HTMLStyleElement[]
    /**
     * app 页面入口上的非全局 script，只会执行一次
     */
    scripts: string[]
    /**
     * 是否首次加载
     */
    isFirstLoad: boolean
    /**
     * app 加载方法
     */
    mount: (options: AnyObject) => Promise<any>
    /**
     * app 卸载方法
     */
    unmount: (options: AnyObject) => Promise<any>
    /**
     * app 生命周期钩子，加载页面资源前触发，只会触发一次
     */
    beforeBootstrap?: () => void
    /**
     * app 生命周期钩子，页面入口的资源被加载并执行后触发，只会触发一次
     */
    bootstrapped?: () => void
    /**
     * app 生命周期钩子，挂载前触发
     */
    beforeMount?: () => void
    /**
     * app 生命周期钩子，挂载后触发
     */
    mounted?: () => void
    /**
     * app 生命周期钩子，卸载前触发
     */
    beforeUmount?: () => void
    /**
     * app 生命周期钩子，卸载后触发
     */
    unmounted?: () => void
    /**
     * js 代码的 loader，每次获取到 js 代码后会传给 loader() 并将返回值作为新的代码
     */
    loader?: (code: string) => string
}