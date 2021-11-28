import axios from "@/libs/axios";

/**
 * 获取当前登录的用户信息
 */
export const getUserInfo = () => {
    return axios.request({
        url: '/user',
        method: 'GET'
    })
}

/**
 * 分页搜索用户
 * @param {用户组id} groupId 
 * @param {分页数据} pageData 
 */
export const pageUser = (pageData) => {
	return axios.request({
		url: `/user/page`,
		method: 'POST',
		data: pageData
	})
}

/**
 * 从用户id列表中查询在此用户组的用户id
 * @param {用户组id} groupId 
 * @param {用户id列表} userIds 
 */
export const getUserIdsInGroup = (groupId, userIds) => {
	return axios.request({
		url: `/group-user/get-user-ids-in-group/${groupId}`,
		method: 'POST',
		data: userIds,
	});
}
