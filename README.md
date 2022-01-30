# mini-single-spa
一个微前端教学项目

## 功能
* 支持不同框架的子应用

## Examples
所有示例均在 examples 目录下。
#### simple example
构建后，使用 vscode live server 插件（或别的本地服务器）打开 simple.html，也可以[在线预览](https://jsrun.net/e59Kp/edit)。

#### multiple-spa example
分别在 multiple-spa 示例的三个子目录 main（主应用）、react（子应用）、vue（子应用）下执行 `pnpm dev` 或 `npm run dev`，然后打开 `http://localhost:8000` 即可查看多个 spa 子应用的示例。

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
子应用必须暴露三个函数，将它们挂在全局的子应用名称（前缀 `mini-single-spa-`）下：
```ts
bootstrap: () => Promise<any>
mount: (props: AnyObject) => Promise<any>
unmount: (props: AnyObject) => Promise<any>

// 假设你注册的子应用名称为 vue，
window['mini-single-spa-vue'] = {
    bootstrap,
    mount,
    unmount
}
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

    // 子应用要挂载的 dom
    container: HTMLElement

    // 子应用入口 url，例如 http://localhost:8001
    pageEntry: string
}
```
