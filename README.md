# mini-single-spa
一个微前端教学项目

## 功能
* 支持不同框架的子应用

## Examples
所有示例均在 examples 目录下。
### simple example
```
pnpm dev
```
构建后，使用 vscode live server 插件（或别的本地服务器）打开 simple.html，也可以[在线预览](https://jsrun.net/e59Kp/edit)。

## 使用
### 安装
```
npm i mini-single-spa
```

### 主应用
在主应用上注册子应用
```js
import { registerApplication, start } from 'mini-single-spa'

registerApplication({
    name: 'vue',
    async loadApp() => {
        return {
            bootstrap() {},
            mount() {},
            unmount() {}
        }
    },
    activeRule: pathPrefix('/vue'),
    container: $('#subapp-viewport')
})

registerApplication({
    name: 'react',
    async loadApp() => {
        return {
            bootstrap() {},
            mount() {},
            unmount() {}
        }
    },
    activeRule: pathPrefix('/react'),
    container: $('#subapp-viewport')
})

start()
```
首先使用 `registerApplication()` 注册所有的子应用，然后执行 `start()` 启动。

### 子应用
子应用必须导出三个函数：
```ts
bootstrap: () => Promise<any>
mount: (props: AnyObject) => Promise<any>
unmount: (props: AnyObject) => Promise<any>
```
`bootstrap()` 在子应用加载时只会启动一次，`mount()` 在子应用挂载时启用，`unmount()` 在子应用卸载时使用。

### registerApplication(Application)
`registerApplication(Application)` 接收的参数如下：
```ts
interface Application {
    // 子应用名称
    name: string

    /**
     * 激活规则，例如传入 /vue，当 url 的路径变为 /vue 时，激活当前子应用。
     * 如果 activeRule 为函数，则会传入 location 作为参数，activeRule(location) 返回 true 时，激活当前子应用。
     */
    activeRule: Function | string

    // 传给子应用的自定义参数
    props: AnyObject

    /**
     * loadApp() 必须返回一个 Promise，resolve() 后得到一个对象：
     * {
     *   bootstrap: () => Promise<any>
     *   mount: (props: AnyObject) => Promise<any>
     *   unmount: (props: AnyObject) => Promise<any>
     * }
     */
    loadApp: () => Promise<any>
}
```
