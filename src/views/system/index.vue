<template>
    <div>
        <van-cell-group>
            <van-cell title="个人信息" is-link @click="goMessage"/>
            <van-cell title="通用" is-link />
            <van-cell title="隐私" is-link />
            <van-cell title="安全" is-link />
        </van-cell-group>
        <!-- 底部菜单 -->
        <my-tabbar></my-tabbar>
        <!-- 底部菜单 -->
    </div>
</template>

<script>
import MyTabbar from '@/components/mytabbar'
export default {
    components: {
        MyTabbar
    },
    data() {
        return {

        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        goMessage(){
            this.$router.push({ path: "/message" });
        }
    },
};
</script>

<style scoped lang="scss">

</style>
