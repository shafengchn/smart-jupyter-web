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
 * 保存或更新用户信息
 * @param {用户信息} userInfo 
 */
export const saveOrUpdateUser = userInfo => {
	return axios.request({
		url: '/user',
		method: 'PUT',
		data: userInfo
	});
}

/**
 * 根据id删除用户
 * @param {用户id} id 
 */
export const removeUserById = id => {
	return axios.request({
		url: `/user/${id}`,
		method: 'DELETE'
	});
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

/**
 * 从用户id列表中查询选择了此课程的用户id
 * @param {课程id} courseId 
 * @param {用户id列表} userIds 
 */
export const getUserIdsInCourse = (courseId, userIds) => {
	return axios.request({
		url: `/course-user/get-user-ids-in-course/${courseId}`,
		method: 'POST',
		data: userIds,
	});
}