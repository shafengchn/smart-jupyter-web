import { createStore } from 'vuex'

export default createStore({
	state: {
		menuList: null,
	},
	mutations: {
		setMenus(state, menuList) {
			state.menuList = menuList
			state.hasLoadUser = true;
		},
	},
	actions: {
		setMenuList({ commit }, menuList) {
            commit('setMenus', menuList)
        },
	},
	getters: {
		menuList: state => state.menuList,
	},
	modules: {
	}
})
