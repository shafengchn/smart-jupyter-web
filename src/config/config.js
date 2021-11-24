let config = {
    baseUrl: {
        dev: 'http://127.0.0.1:30185',//http://localhost:30085
        pro: 'http://cloud.sinoaopt.com:30085'//'http://jfapi.bmwfw.xyz'
    },
   /**
    * @description 默认打开的首页的路由name值，默认为home
    */
    homeName: 'home',
    pageSize: 10
};

config.previewUrl = `${process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro}/file/firmware/`;
export default config;
