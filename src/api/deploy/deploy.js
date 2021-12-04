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