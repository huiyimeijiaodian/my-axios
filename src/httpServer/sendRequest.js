import server from './server.js';
import qs from 'qs';
function myServer(){
	this.server = server;
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
myServer.prototype.sendRequest = function(modulName,name,urlItem,data={}){
	// 参数处理，健壮性
	var type=(typeof urlItem =='object'&& urlItem.type=='post')?'post':'get';//默认get请求
	var url=typeof urlItem =='object'?urlItem.url:urlItem;
	var self = this;
	//二次封装是为了特异性操作，如加遮罩，发请求统计接口
	// 请求发送前-->请求处理-->请求发送后
	var resBeforeFn = function(mes){
		console.log('请求前处理',mes);
		self[modulName][name].state='ready';//重置该接口方法可继续请求
		return mes;
	};

	var callback = function(res){
		// console.log('请求回调处理');
		if(res.data.rc!=0){
			// 可进行rc非0处理
			console.log(res.data.msg);
		}
		return res.data;
	}
	var reqMethodObj = { //适配器模式
		get:function(){
			var urlqs = url + "?" +qs.stringify(data);//get使用表单提交
			return server.get(urlqs).then(resBeforeFn).then(callback);
		},
		post:function(){ //post使用json格式提交
			return server.post(url,data).then(resBeforeFn).then(callback);
		}
	}
	if(self[modulName][name].state=='ready'){//防止请求未结束重复操作
		self[modulName][name].state='pending';
		return reqMethodObj[type]();
	}else{
		// 可以处理重复请求
		return new Promise((resolve)=>{
			resolve({rc:1,msg:'sending request'});
		})
	}
}
export default new myServer;