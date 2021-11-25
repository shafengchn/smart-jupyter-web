import "@/common/prototypes/index";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons';
import { transElIconName } from "@/common/utils/IconUtil";
import Config from "@/config/config";

const app = createApp(App)

app.use(store)
    .use(router)
    .use(ElementPlus);

for (let iconName in ElIconModules) {
    app.component(transElIconName(iconName), ElIconModules[iconName])
}

app.config.globalProperties.$config = Config;

const vm = app.mount('#app')
