<template>
    <div class="message">
        <div>
            <van-cell-group>
                <van-cell title="姓名" :value="message.name" is-link @click="edit(message.name)"/>
                <van-cell title="电话" :value="message.phone" is-link @click="edit(message.phone)"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="切换账号"/>
            </van-cell-group>
             <van-cell-group>
                <van-cell title="退出登录" @click="logout"/>
            </van-cell-group>
        </div>
        
    </div>
</template>

<script>
import {postJson} from '@/utils/common'
export default {
    components: {

    },
    data() {
        return {
            message:{
                name:'Ganwei',
                phone:'13527398812'
            }
        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        edit(value){

        },
        logout(){
            store.dispatch('logOut')
        }
    },
};
</script>

<style scoped lang="scss">

</style>
