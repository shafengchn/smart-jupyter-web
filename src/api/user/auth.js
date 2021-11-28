import axios from "@/libs/axios";

/**
 * 用户登录（明文）
 * @param {用户名密码} param0 
 */
export const login = ({ username, password }) => {
    return axios.request({
        url: '/oauth/token',
        params: {
            username,
            password,
            grant_type: 'password',
        },
        auth: {
            username: 'dfyj',
            password: '123456789'
        },
        method: 'POST'
    })
}

/**
 * 当前用户退出登录
 */
export const logout = () => {
    return axios.request({
        url: '/user/logout',
        method: 'POST',
    });
}

/**
 * 根据用户id重设密码
 * @param {用户id} userId 
 * @param {新密码} newPwd 
 */
export const resetPasswordById = (userId, newPwd) => {
	return axios.request({
		url: `/user/reset-password/${userId}`,
		method: "POST",
		data: {
			newPwd
		}
	})
}