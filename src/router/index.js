import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from "@/common/utils/TokenUtil";
import { ElMessage } from 'element-plus';
import routes from "./routes";
import store from "@/store/index";
import { getUserMenu } from "@/api/sys/menu";
import { getUserInfo } from "@/api/user/user";

export const LOGIN_PAGE_NAME = "login";

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {

	if (to.name == '404' || to.name == '401') {
		// 如果是错误页面则直接进入
		return next();
	}

	// console.log(router.getRoutes());

	const token = getToken();
	if (!token && to.name !== LOGIN_PAGE_NAME) {
		// 未登录，跳转非登录页
		if (to.name != null) {
			ElMessage.warning({ message: '您当前的会话已超时，请重新登录', duration: 4000 });
		}
		// 强行跳转至登录页
		return next({ name: LOGIN_PAGE_NAME })
	} else if (!token && to.name == LOGIN_PAGE_NAME) {
		return next();
	} else if (token) {
		// 登录了
		if (store.getters.menuList == null) {
			// 还没有获取路由
			getUserMenu().then(res => {
				if (res.data.length == 0) {
					return next({ name: '401' });
				}
				// 添加路由信息
				addRoutes(res.data, router, 'root');
				// 保存菜单数据
				let menus = getMenuList(res.data);
				store.dispatch('setMenuList', menus);
				// 开始获取用户信息
				return getUserInfo();
			}).then(res=>{
				store.dispatch('setUserInfo', res.data);
				next({ ...to, replace: true });
			}).catch(err => {
				next({ name: '404' });
			})
		} else if (store.getters.menuList.length == 0) {
			// 获取了路由，但是为空，说明没有权限
			return next({ name: '401' })
		} else if (to.name == LOGIN_PAGE_NAME) {
			// 登录了，但是跳转的是登录页
			return next({ name: 'home' });
		} else if (to.fullPath == '/') {
			return next({ name: "home" });
		} else {
			next();
		}
	}
})

/**
 * 返回左侧菜单列表
 * @param {}} menus 
 */
export const getMenuList = (menus) => {
	let list = []
	menus.forEach(menu => {
		let item = {
			title: menu.title,
			path: menu.path,
			icon: menu.icon,
			name: menu.name,
			children: []
		};
		if (menu.children && menu.children.length > 0) {
			item.children = getMenuList(menu.children)
		}
		list.push(item);
	})
	return list;
}

/**
 * 添加路由
 * @param {}} menus 
 */
export const addRoutes = (menus, router, parentName) => {
	menus.forEach(menu => {
		
			let item = {
				path: menu.path,
				name: menu.name,
				component: () => import('../views/' + menu.component + '.vue'),
			}
			if (!menu.isHide) {
				if(parentName) {
					router.addRoute(parentName, item);
				} else {
					router.addRoute(item)
				}
			}
			if (menu.children && menu.children.length) {
				addRoutes(menu.children, router, parentName);
			}
		
	})
}


export default router
