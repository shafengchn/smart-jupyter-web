import axios from "@/libs/axios";

/**
 * 用户组（角色）列表
 * @returns 用户组列表
 */
export const listGroup = () => {
    return axios.request({
        url: '/group/list',
        method: 'GET'
    });
}

/**
 * 保存或更新用户组信息
 * @param {用户组信息} param0 
 * @returns 更新后的值
 */
export const saveOrUpdateGroup = ({ id, groupName, sort, createTime, updateTime }) => {
    return axios.request({
        url: '/group',
        method: 'PUT',
        data: { id, groupName, sort, createTime, updateTime }
    })
}

/**
 * 根据id删除用户组
 * @param {用户组id} id 
 * @returns 
 */
export const removeGroupById = id => {
    return axios.request({
        url: `/group/${id}`,
        method: 'DELETE',
    })
}

/**
 * 保存用户组的菜单权限
 * @param {用户组id} groupId 
 * @param {已选择的菜单id} menuIds 
 * @returns 
 */
export const saveGroupMenu = (groupId, menuIds = []) => {
    return axios.request({
        url: `/group-menu/save-group-menu/${groupId}`,
        method: 'POST',
        data: menuIds
    })
}

/**
 * 根据用户组的id获取该用户组有权限的菜单id
 * @param {用户组id} groupId 
 */
export const getMenuIdsByGroupId = groupId => {
    return axios.request({
        url: `/group-menu/get-menu-by-group/${groupId}`,
        method: 'GET',
    });
}

/**
 * 加入或离开用户组
 * @param {用户组id} groupId 
 * @param {用户：是否在此组} relationData 
 */
export const joinOrLeaveGroupByUserIds = (groupId, relationData) => {
	return axios.request({
		url: `/group-user/join-or-leave-group-by-user-ids/${groupId}`,
		method: 'POST',
		data: relationData
	});
}