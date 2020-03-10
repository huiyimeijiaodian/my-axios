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
			this.$http.login.loginIn().then((data)=>{
				this.loginIn = data;
				console.log("loginIn data",data);
			});
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
			
			this.$http.login.loginOut({id:'99999'})
				.then((data)=>{
					this.loginOut = data;
					console.log('退出成功',data);
				})
			
			this.$http.user.userList()
				.then((data)=>{
					this.userList1 = data;
					console.log("userlist第一次请求",data);
				});//该接口2秒后才返回数据
				
			setTimeout(()=>{ //在上一个接口还没返回数据1S后再次调用，不会重复请求
				this.$http.user.userList()
					.then((data)=>{
						if(data.rc==1){
							this.userList2 = data;
						}
						console.log("userlist第二次请求",data);
					});//该接口2秒后才返回数据
			},1000)
	  },
	  mounted() {
	  	
	  }
	};
</script>

<style>
</style>
