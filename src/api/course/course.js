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
 * 保存或更新课程
 * @param {课程数据} courseData 
 */
export const saveOrUpdateCourse = courseData => {
	return axios.request({
		url: `/course`,
		method: 'PUT',
		data: courseData,
		headers: {
			contentType: 'mutipart/form-data'
		}
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

/**
 * 选择或取消选择课程
 * @param {课程id} courseId 
 * @param {用户：是否选择了该课程} relationData 
 */
export const selectOrUnselectCourseByUserIds = (courseId, relationData) => {
	return axios.request({
		url: `/course-user/select-or-unselect-course-by-user-ids/${courseId}`,
		method: 'POST',
		data: relationData
	});
}

/**
 * 获取当前用户的课程列表
 */
export const listMyCourses = () => {
	return axios.request({
		url: `/course/list-my`,
		method: 'GET'
	})
}