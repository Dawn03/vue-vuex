
import axios from "axios";
// import qs from "qs";
// import app from "../main";
import {
    Message,
    Loading
} from 'element-ui'

/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: "/api",//process.env.BASE_URL,  // api的base_url
    timeout: 5000  // 请求超时时间
});


/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    // app.$vux.loading.show({
    //     text: '数据加载中……'
    // });
    Loading.service({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
    });
    // config.method === 'post'
    //     ? config.data = qs.stringify({ ...config.data })
    //     : config.params = { ...config.params };
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['Content-Type'] = 'application/json';

    return config;

}, error => {  //请求错误处理
    console.log(26)

    // app.$vux.toast.show({
    //     type: 'warn',
    //     text: error
    // });
    Promise.reject(error)
});

/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        // app.$vux.loading.hide();
        let loadingInstance = Loading.service({
            lock: true,
            text: '拼命加载中',
            spinner: 'el-icon-loading',
        });
        loadingInstance.close();
        //这里根据后端提供的数据进行对应的处理
        // console.log('requst.js', response)
        if (response.data.status === "success") {
            return response.data;
        } else {
            Message({
                message: response.data.info,
                type: 'error'
            });
            return response.data;
            // app.$vux.toast.show({  //常规错误处理
            //     type: 'warn',
            //     text: response.data.data.msg
            // });
        }
    },
    error => {  //响应错误处理
        console.log('error');
        console.log(error);
        console.log(JSON.stringify(error));

        let text = JSON.parse(JSON.stringify(error)).response.status === 404
            ? '404'
            : '网络异常，请重试';
        // app.$vux.toast.show({
        //     type: 'warn',
        //     text: text
        // });

        return Promise.reject(error)
    }
);

export default service;