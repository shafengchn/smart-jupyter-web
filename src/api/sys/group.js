import axios from "@/libs/axios";

export const listGroup = () => {
    return axios.request({
        url: '/group/list',
        method: 'GET'
    });
}