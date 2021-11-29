import axios from "@/libs/axios";

/**
 * 获取服务器远程配置
 */
export const getRemoteConfig = () => {
	return axios.request({
		url: `/server/remote-config`,
		method: 'GET'
	});
}

/**
 * 保存或更细远程配置信息
 * @param {远程配置信息} remoteConfig 
 */
export const saveOrUpdateRemoteConfig = remoteConfig => {
	return axios.request({
		url: '/server/remote-config',
		method: 'PUT',
		data: remoteConfig
	});
}