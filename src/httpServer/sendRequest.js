import server from './server.js';
import qs from 'qs';
function myServer(){
	this.server = server;
	this.nowHandle=null;
}
myServer.prototype.bindHandle = function(ob){
	this.nowHandle = ob;
	return this;//返回this维持then链式调用
}
myServer.prototype.parseRouter=function(name,urlOb){
	var ob ={};
	this[name]=ob;
	Object.keys(urlOb).forEach((item)=>{
		ob[item] = this.sendRequest.bind(this,name,item,urlOb[item]);//this.login.loginIn=...
		ob[item].state='ready';
	})
	console.log(this);
}
myServer.prototype.sendRequest = function(modulName,name,url,config={}){
	// 参数处理，健壮性
	// console.log(modulName,name,url,config);
	var type = config.type||'get';
	var data = config.data||{};
	var bindName = config.bindName || name;
	var self = this;
	//二次封装是为了特异性操作，如加遮罩，发请求统计接口
	// 请求发送前-->请求处理-->请求发送后
	var resBeforeFn = function(mes){
		console.log('请求前处理',mes);
		self[modulName][name].state='ready';//重置该接口方法可继续请求
		return mes;
	};
	// 默认处理：将返回数据绑定到调用组件数据中
	var resDefaultFn = function(res){
		console.log('请求处理',res);
		self.nowHandle[bindName] = res;
		return res.data;
	}
	var success = config.success || resDefaultFn;//可自定义函数处理，提升可扩展性
	var callback = function(res){
		// console.log('请求回调处理');
		success(res.data,resDefaultFn);
	}
	var reqMethodObj = { //适配器模式
		get:function(){
			var urlqs = url + "?" +qs.stringify(data);//get使用表单提交
			server.get(urlqs).then(resBeforeFn).then(callback);
		},
		post:function(){ //post使用json格式提交
			server.post(url,data).then(resBeforeFn).then(callback);
		}
	}
	console.log('状态',self[modulName][name].state);
	if(self[modulName][name].state=='ready'){//防止请求未结束重复操作
		self[modulName][name].state='pending';
		reqMethodObj[type]();
	}
}
export default new myServer;