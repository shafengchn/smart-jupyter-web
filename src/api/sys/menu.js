import axios from "@/libs/axios";

/**
 * 获取当前用户树形菜单&路由
 */
export const getUserMenu = () => {
    return axios.request({
        url: '/menu/get-cur-menu',
        method: 'GET'
    })
}

/**
 * 根据父级菜单id获取子级菜单列表
 * @param {父级菜单id，null为顶级} parentId 
 */
export const getMenusByParentId = parentId => {
    return axios.request({
        url: '/menu/list',
        method: 'GET',
        params: {
            parentId
        }
    })
}

/**
 * 保存或更新菜单
 * @param {菜单数据}} param0 
 */
export const saveOrUpdateMenu = ({ id, title, name, path, component, icon, isHide, parentId, redirectName, sort }) => {
    return axios.request({
        url: '/menu',
        method: 'PUT',
        data: { id, title, name, path, component, icon, isHide, parentId, redirectName, sort },
    })
}

/**
 * 根据菜单id删除菜单
 * @param {菜单id} menuId 
 */
export const removeMenu = menuId => {
    return axios.request({
        url: `/menu/${menuId}`,
        method: 'DELETE',
    })
}

/**
 * 获取树形所有菜单信息
 * @returns 树形菜单
 */
export const treeMenus = () => {
    return axios.request({
        url: '/menu/tree',
        method: 'GET'
    });
}