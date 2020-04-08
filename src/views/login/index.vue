<template>
    <div class="login">
        <div class="container">
            <van-Form @submit="onSubmit">
                <div class="login_form">
                    <van-field
                        v-model="formData.username"
                        name="用户名"
                        left-icon="manager"
                        placeholder="请输入用户名"
                        label=""
                        :rules="[{ required: true, message: '用户名不能为空' }]"
                    />
                    <van-field
                        v-model="formData.password"
                        type="password"
                        name="密码"
                        left-icon="lock"
                        placeholder="请输入密码"
                        label=""
                        :rules="[{ required: true, message: '密码不能为空' }]"
                    />
                </div>
                <div style="margin: 16px 0;">
                    <van-button round block type="info" :loading="loading" native-type="submit">提交</van-button>
                </div>    
            </van-Form>
        </div>
    </div>
</template>

<script>
import { getToken, setToken, removeToken } from "@/utils/auth";
import md5 from "js-md5";
import { Toast } from 'vant'
export default {
    components: {

    },
    data() {
        return {
            formData:{},
            loading:false,  //按钮loading
        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        onSubmit(values){
            this.loading = true;
            let loginForm = {
                username: this.formData.username,
                password:
                this.formData.password.trim().length < 32
                    ? md5(this.formData.password)
                    : this.formData.password.trim()
            };
            this.$store.dispatch('Login',loginForm).then((res) => {
                setToken(loginForm.username, "username");
                setToken(loginForm.password, "userpassword");
                this.loading = false;
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push({
                        path: redirect
                    })
            }).catch((error) => {
                console.log('-------',error);
                this.loading = false;
                Toast.fail(error.message);
            })
        }
    },
};
</script>

<style scoped lang="scss">
.login{
    width: 100%;
    min-height: 100%;
    .container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;
        // background: url('../../assets/images/timg (1).jpg');
        // background-size: cover;
        background-color: salmon;
        .login_form{
            border-radius: 10px;
            overflow: hidden;
        }
        .van-button--info{
            color: #fff;
            background-color: #e44c3b;
            border: 0.02667rem solid #e44c3b;
        }
    }
}
</style>
