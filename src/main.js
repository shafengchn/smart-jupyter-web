import "@/common/prototypes/index";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Config from "@/config/config";

const app = createApp(App)

app.use(store)
    .use(router)
    .use(ElementPlus);

app.config.globalProperties.$config = Config;

const vm = app.mount('#app')
