import Cookies from "js-cookie";

const TokenKey = "_ABCXZZZXC";
const expires = 3600;

export const getToken = () => {
    return Cookies.get(TokenKey);
}

export const setToken = (token, expires = expires) => {
    if(!token || token.length == 0) {
        Cookies.remove(TokenKey);
    } else {
        Cookies.set(TokenKey, token, { expires });
    }
}