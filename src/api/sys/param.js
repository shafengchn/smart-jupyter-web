import axios from "@/libs/axios";

/**
 * 根据父级参数id获取子集参数列表
 * @param {父级参数id，不传或传NULL代表顶级} parentId 
 */
export const listParamByParentId = parentId => {
	return axios.request({
		url: '/sys/param',
		method: 'GET',
		params: {
			parentId
		}
	})
}

/**
 * 保存或更新参数
 * @param {参数信息} param 
 */
export const saveOrUpdateParam = param => {
	return axios.request({
		url: '/sys/param',
		method: 'PUT',
		data: param,
	})
}

/**
 * 根据参数id删除参数
 * @param {参数id} paramId 
 */
export const removeParamById = paramId => {
	return axios.request({
		url: `/sys/param/${paramId}`,
		method: 'DELETE',
	})
}

/**
 * 根据父级参数值获取子集参数列表
 * @param {父级参数列表或父级参数} parentValues 
 */
export const listByParentValue = parentValues => {
	let data = [];
	if (typeof parentValues == 'string') {
		data.push(parentValues);
	} else {
		data = parentValues;
	}
	return axios.request({
		url: '/sys/param/list-by-parent-value',
		method: 'POST',
		data
	});
}