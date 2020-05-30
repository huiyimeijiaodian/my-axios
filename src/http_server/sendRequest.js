import server from './server.js';
// import qs from 'qs';
function myServer() {
	this.server = server;
}
//解析配置文件映射为类的方法
myServer.prototype.parseRouter = function (moduleName, urlOb) {
	let obj = {};
	this[moduleName] = obj;
	Object.keys(urlOb).forEach((item) => {
		//绑定结果例如:myServer.user.userList=function(){}
		obj[item] = this.sendRequest.bind(this, moduleName, item, urlOb[item]);
		obj[item].state = 'ready'; // 状态标记防频繁请求
	});
};

//接口对应方法具体实现
myServer.prototype.sendRequest = function (moduleName, fnName, urlItem, data = {}) {
	// 参数处理，健壮性
	let type = urlItem.type && urlItem.type.toLowerCase();
		type = type ? type : 'get';//默认get请求
	const url = typeof urlItem === 'object' ? urlItem.url : urlItem;
	const self = this;
	//二次封装是为了特异性操作，如加遮罩，进度条，发请求统计接口
	// 请求发送前-->请求处理-->请求发送后
	let resBeforeFn = function (mes) {
		// console.log('请求前处理', mes);
		self[moduleName][fnName].state = 'ready';//重置该接口方法可继续请求
		return mes;
	};

	let callback = function (res) {
		// console.log('请求回调处理');
		if (res.data.code !== 0) {
			// 可进行code非0处理
		}
		return res.data; // 只返回接口数据data
	}
	// let reqMethodObj = {};
	// reqMethodObj[type] = function() {
	// 	return server[type](url, data).then(resBeforeFn).then(callback);
	// }
	if (self[moduleName][fnName].state == 'ready') {//防止请求未结束重复操作
		self[moduleName][fnName].state = 'pending';
		return server[type](url, data).then(resBeforeFn).then(callback);
	} else {
		// 可以处理重复请求
		return new Promise((resolve) => {
			resolve({ code: 1, msg: 'sending request' });
		})
	}
}
export default new myServer;