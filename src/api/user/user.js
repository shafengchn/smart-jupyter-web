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