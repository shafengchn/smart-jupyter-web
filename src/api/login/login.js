import axios from "@/libs/axios";

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
        method: 'post'
    })
}