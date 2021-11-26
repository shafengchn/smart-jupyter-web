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

export const logout = () => {
    return axios.request({
        url: '/user/logout',
        method: 'POST',
    });
}