import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/reset.css'

Vue.use(ElementUI);
Vue.config.productionTip = false

let router = null
let app = null
function render(options = {}) {
    console.log(window.name)
    const { container } = options
    router = new VueRouter({
        routes,
    })
    
    app = new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount(container ? container.querySelector('#app') : '#app')
}


export async function mount(options) {
    window.spaGlobalState.onChange((state, operator, key) => {
        alert(`multiple 子应用监听到 spa 全局状态发生了变化: ${JSON.stringify(state)}，操作: ${operator}，变化的属性: ${key}`)
    })

    window.spaGlobalState.on('testEvent', () => alert('multiple 子应用监听到父应用发送了一个全局事件: testEvent'))
    
    console.log('[vue] options from main framework', options)
    render(options)
}

export async function unmount() {
    app.$destroy()
    app.$el.innerHTML = ''
    app = null
    router = null
}

if (window.__IS_SINGLE_SPA__) {
    window.__SINGLE_SPA__= {
        mount,
        unmount
    }

    window.addEventListener('click', () => {
        console.log('window click: vue')
    })

    window.onclick = () => {
        console.log('window onclick: vue')
    }

    document.addEventListener('click', () => {
        console.log('document click: vue')
    })

    document.onclick = () => {
        console.log('document onclick: vue')
    }

    setTimeout(() => {
        console.log('setTimeout')
    }, 3000)
} else {
    render()
}

window.name = 'multiple'