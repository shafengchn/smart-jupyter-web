import axios from "@/libs/axios";

/**
 * 获取课程容器状态
 * @param {课程id} courseId 
 */
export const getContainerStatus = courseId => {
	return axios.request({
		url: '/auto-deploy/container-status/' + courseId,
		method: 'GET'
	})
}

/**
 * 部署容器
 * @param {课程id} courseId 
 * @returns 
 */
export const deployCourseContainer = courseId => {
	return axios.request({
		url: `/auto-deploy/start-deploy/${courseId}`,
		method: 'GET'
	})
}

/**
 * 删除容器
 * @param {容器id} courseId 
 * @param {是否同时删除容器映射的文件} removeFile 
 * @returns 
 */
export const removeCourseContainer = (courseId, removeFile = false) => {
	return axios.request({
		url: `/auto-deploy/remove-container/${courseId}`,
		method: 'GET',
		params: {
			removeFile
		}
	})
}

/**
 * 获取课程容器用户状态
 * @param {课程id} courseId 
 * @returns 
 */
export const getJupyterUserStatus = courseId => {
	return axios.request({
		url: `/auto-deploy/get-jupyter-user-status/${courseId}`,
		method: 'GET'
	});
}

/**
 * 创建课程容器用户
 * @param {课程id} courseId 
 * @returns 
 */
export const createJupyterUser = courseId => {
	return axios.request({
		url: `/auto-deploy/create-jupyter-user/${courseId}`,
		method: 'POST'
	});
}