<template>
    <div style="text-align:center;">
        <h4>Test接口测试页面</h4>
        <p>loginIn.json返回数据:</p>
        {{loginIn}}
        <p>loginOut.json返回数据:</p>
        {{loginOut}}
        <p>userList.json返回数据(第1次):</p>
        {{userList1}}
        <p>userList.json返回数据(第2次):</p>
        {{userList2}}
        <p>deleteUser.json返回数据:</p>
        {{deleteUser}}
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    name: "Home",
    data: function() {
        return {
            loginIn: "",
            loginOut: "",
            userList: "",
            userList1: "",
            userList2: "",
            deleteUser: ""
        };
    },
    created() {
        // this.$http.bindHandle(this);//绑定this
        // 第一种调用写法，默认参数，then处理回调
        this.$http.login.loginIn().then(data => {
            this.loginIn = data;
        });

        this.$http.login.loginOut({ id: "99999" }).then(data => {
            this.loginOut = data;
        });

        this.$http.user.userList().then(data => {
            this.userList1 = data;
            console.log("userlist第一次请求", data);
        }); //该接口2秒后才返回数据

        setTimeout(() => {
            //在上一个接口还没返回数据1S后再次调用，不会重复请求
            this.$http.user.userList().then(data => {
                if (data.code === 0) {
                    this.userList2 = data;
                }
                console.log("userlist第二次请求", data);
            }); //该接口2秒后才返回数据
        }, 1000);

        this.$http.user.deleteUser().then(data => {
            this.deleteUser = data;
        });
    }
};
</script>