import axios from "@/libs/axios";

export const getUserMenu = () => {
    return axios.request({
        url: '/menu/get-cur-menu',
        method: 'GET'
    })
}

export const getMenusByParentId = parentId => {
    return axios.request({
        url: '/menu/list',
        method: 'GET',
        params: {
            parentId
        }
    })
}