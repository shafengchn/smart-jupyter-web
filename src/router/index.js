import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from "@/common/utils/TokenUtil";
import { ElMessage } from 'element-plus';
import Routes from "./routers";

export const LOGIN_PAGE_NAME = "login";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: Routes
})



router.beforeEach((to, from, next) => {

  if (to.name == '404' || to.name == '401') {
    // 如果是错误页面则直接进入
    return next();
  }

  const token = getToken();
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录，跳转非登录页
    if (to.name != null) {
      ElMessage.warning({ message: '您当前的会话已超时，请重新登录', duration: 4000 });
    }
    return next({ name: LOGIN_PAGE_NAME })
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 登录了，但是跳转的时登录页，取消导航
    return false;
  }
  return next();
})

export default router
