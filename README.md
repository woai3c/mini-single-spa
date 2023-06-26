# mini-single-spa
一个微前端教学项目

## 原理分析
* [手把手教你写一个简易的微前端框架 ](https://github.com/woai3c/Front-end-articles/issues/31)

## 功能
* 支持不同框架的子应用
* 支持子应用 HTML 入口
* 支持沙箱功能，子应用 window 作用域隔离、元素隔离
* 支持子应用样式隔离
* 支持各应用之间的数据通信

## Examples
所有示例均在 examples 目录下。
### 运行示例
安装
```
pnpm install --frozen-lockfile && pnpm install:all
```
运行开发环境
```
pnpm dev:all
```
访问 `http://localhost:8000`，即可查看多个 spa 子应用的示例。

## 使用
### 安装
```bash
npm i mini-single-spa
# or
pnpm i mini-single-spa
# or
yarn add mini-single-spa
```

### 主应用
在主应用上注册子应用
```js
import { registerApplication, start } from 'mini-single-spa'

registerApplication({
    name: 'vue',
    pageEntry: 'http://localhost:8001',
    activeRule: pathPrefix('/vue'),
    container: $('#subapp-viewport')
})

registerApplication({
    name: 'react',
    pageEntry: 'http://localhost:8002',
    activeRule:pathPrefix('/react'),
    container: $('#subapp-viewport')
})

start()
```
首先使用 `registerApplication()` 注册所有的子应用，然后执行 `start()` 启动。

### 子应用
子应用必须向外暴露 `mount()` 和 `unmount()` 两个函数，并将它们挂在全局的子应用名称 `window.__SINGLE_SPA__` 下：
```ts
mount: (props: AnyObject) => Promise<any>
unmount: (props: AnyObject) => Promise<any>

window.__SINGLE_SPA__= {
    mount,
    unmount
}
```
`mount()` 在子应用每次挂载时启用，`unmount()` 在子应用每次卸载时使用。

### 子应用跨域和资源路径
子应用需要开启 cors 和指定生成的资源路径，假如你使用 `vue-cli` 进行开发，可以这样配置：
```js
module.exports = {
    devServer: {
        port: 8001, // 设置子应用访问端口
        headers: {
            'Access-Control-Allow-Origin': '*' // 解决跨域问题
        }
    },
    publicPath: "//localhost:8001/", // 资源路径前缀
}
```

### 全局状态、全局事件
在父子应用上均可以使用 `window.spaGlobalState` 来设置、监听全局状态：
```js
// 父应用
window.spaGlobalState.set('msg', '父应用在 spa 全局状态上新增了一个 msg 属性')

// 子应用（全局状态、事件不会生成快照和恢复，所以要在 mount() 调用后使用）
window.spaGlobalState.onChange((state, operator, key) => {
    alert(`vue 子应用监听到 spa 全局状态发生了变化: ${JSON.stringify(state)}，操作: ${operator}，变化的属性: ${key}`)
})
```
也可以使用全局事件：
```js
// 父应用
window.spaGlobalState.emit('testEvent', '父应用发送了一个全局事件: testEvent')

// 子应用
window.spaGlobalState.on('testEvent', () => alert('vue 子应用监听到父应用发送了一个全局事件: testEvent'))
```
**注意**，子应用设置的全局状态、事件会在卸载时清除，并且不会保存快照。所以建议将状态、事件相关操作放在 `mount()` 函数执行时或之后。
#### 全局状态、事件 API
```ts
// 状态相关
set(key: string, value: any): void;
get(key: string): any;
getAll(): AnyObject;
delete(key: string): void;
clear(): void;
onChange(callback: Callback): void;

// 事件相关
on(event: string, callback: Callback): void;
off(event: string, callback: Callback): void;
emit(event: string, ...args: any): void;
once(event: string, callback: Callback): void;
```

### registerApplication(Application)
`registerApplication(Application)` 接收的参数如下：
```ts
interface Application {
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
     * enabled: 是否开启 js 作用域隔离、元素隔离，默认开启
     * css: 是否开启样式隔离，默认关闭
     */
    sandboxConfig: { enabled: boolean, css: boolean }
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
```
