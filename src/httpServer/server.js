import axios from 'axios';

const service = axios.create({
	baseURL:'http://localhost:8888/',
	timeout:2000
})
// 设置请求拦截器
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 设置响应拦截器
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
		if(error.message.includes('timeout')){
			console.log("超时错误", error);
		}
    return Promise.reject(error);
  });
export default service;