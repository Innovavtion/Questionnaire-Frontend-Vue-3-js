import { createApp } from 'vue'
import App from './App.vue'

import router from "./router/router.js";

import BootstrapVue3 from 'bootstrap-vue-3'

import components from './components/UI/index.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import store from './store/index.js'

// import api from './api/index.js'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component);
})

app.use(router)
app.use(BootstrapVue3)
app.use(store)
// app.use(api)
app.mount('#app')