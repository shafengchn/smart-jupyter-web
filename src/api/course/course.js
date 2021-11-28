import axios from "@/libs/axios";

/**
 * 获取所有课程列表
 */
export const listAllCourse = () => {
	return axios.request({
		url: `/course/list`,
		method: 'GET'
	});
}

/**
 * 保存或更细课程
 * @param {课程数据} courseData 
 */
export const saveOrUpdateCourse = courseData => {
	return axios.request({
		url: `/course`,
		method: 'PUT',
		data: courseData
	})
}

/**
 * 根据课程id删除课程
 * @param {课程id} courseId 
 */
export const removeCourseById = courseId => {
	return axios.request({
		url: `/course/${courseId}`,
		method: 'DELETE'
	});
}