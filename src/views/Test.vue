<template>
	<div>
		<h4>Test接口测试页面</h4>
		<p>loginIn.json返回数据(第一种):</p>
		{{loginIn}}
		<p>loginIn.json返回数据(第二种):</p>
		{{loginData}}
		<p>loginOut.json返回数据:</p>
		{{loginOut}}
		<p>userList.json返回数据(第1次):</p>
		{{userList1}}
		<p>userList.json返回数据(第2次):</p>
		{{userList2}}
		<!-- <p>addUser.json返回数据:</p>
		{{addUser}} -->
	</div>
</template>

<script>
	// import axios from 'axios';
	export default {
	  name: "Home",
	  data:function(){
			return {
				loginIn:'',
				loginData:'',
				loginOut:'',
				userList:'',
				userList1:'',
				userList2:'',
				addUser:'',
			}
	  },
	  created() {
			// this.$http.bindHandle(this);//绑定this
			// 第一种调用写法，默认参数，then处理回调
			// this.$http.login.loginIn().then((data)=>{
			// 	console.log("loginIn data",data);
			// });
			// 第二种调用写法，传参，success处理回调
			// this.$http.login.loginIn({
			// 	type:'get',
			// 	data:{id:'888888'},
			// 	// bindName:'resData'
			// 	success:(data)=>{
			// 		console.log('登录成功回调',data);
			// 		this.loginData = data;
			// 	}
			// }).then((data)=>{
			// 		console.log("data3",data);
			// 	});
			
			// this.$http.login.loginOut({
			// 	type:'post',
			// 	data:{id:'99999'},
			// 	success:(data)=>{
			// 		console.log('退出成功回调',data);
			// 		this.loginOut = data;
			// 	}
			// })
			
			this.$http.user.userList({
				type:'get',
				success:(data)=>{
					console.log('用户列表第1次请求回调',data);
					this.userList1 = data;
				}
			}).then((data)=>{
				console.log("userlist data",data);
			}).catch(error=>{
				console.log('error',error);
			});//该接口2秒后才返回数据
			setTimeout(()=>{ //在上一个接口还没返回数据1S后再次调用，不会重复请求
				this.$http.user.userList({
					type:'get',
					success:(data)=>{
						console.log('用户列表第2次请求回调',data);//不会输出
						this.userList2 = data;
					}
				}).then((data)=>{
						console.log("userlist data222",data);
					});//该接口2秒后才返回数据
			},1000)
	  },
	  mounted() {
	  	
	  }
	};
</script>

<style>
</style>
