<template>
    <div class="login">
        <div class="container">
            <van-form @submit="onSubmit">
                <van-field
                    v-model="formData.username"
                    name="用户名"
                    label="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="formData.password"
                    type="password"
                    name="密码"
                    label="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            formData:{}
        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        onSubmit(values){
            console.log('-------------',values);
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
        background: url('../../assets/images/timg (1).jpg');
        background-size: cover;
        .login_from{
            width: 100%;
            height: 100%;
            background-color: rgba($color: #000000, $alpha: 0.5);
        }
    }
}
</style>
