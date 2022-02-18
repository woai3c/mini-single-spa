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

window.name = 'vue'