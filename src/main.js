import "@/common/prototypes/index";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import 'element-plus/dist/index.css'
import * as ElIconModules from '@element-plus/icons';
import { transElIconName } from "@/common/utils/IconUtil";
import Config from "@/config/config";


const app = createApp(App)
app.use(store)
    .use(router)
    .use(ElementPlus, {
		locale: zhCn
	});

// 图标组件
for (let iconName in ElIconModules) {
    app.component(transElIconName(iconName), ElIconModules[iconName])
}

// 全局方法
app.config.globalProperties.$config = Config;
app.config.globalProperties.$component = componentName => {
    return app._instance.appContext.components[componentName];
};


const vm = app.mount('#app')
