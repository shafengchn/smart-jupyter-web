let config = {
    baseUrl: {
        dev: 'http://127.0.0.1:30185',//http://localhost:30085
        pro: `http://${window.location.host}/api` //'http://jfapi.bmwfw.xyz'
    },
    jupyterProxyServerIp: {
        dev: '127.0.0.1',
        pro: '10.254.1.201'
    },
   /**
    * @description 默认打开的首页的路由name值，默认为home
    */
    homeName: 'home',
    pageSize: 10
};

config.downloadUrl = `${process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro}/file/download/`;
export default config;
