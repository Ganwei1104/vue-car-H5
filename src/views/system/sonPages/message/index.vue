<template>
    <div class="message">
        <div>
            <van-cell-group>
                <van-cell title="姓名" :value="message.name" is-link @click="edit(message.name)"/>
                <van-cell title="电话" :value="message.phone" is-link @click="edit(message.phone)"/>
            </van-cell-group>
            <van-cell-group style="margin:5px 0px;">
                <van-cell title="切换账号" class="text-class" clickable/>
            </van-cell-group>
             <van-cell-group style="margin-bottom:5px;">
                <van-cell title="退出登录" class="text-class" clickable @click="logout"/>
            </van-cell-group>
        </div>
        
    </div>
</template>

<script>
import {postJson} from '@/utils/common'
import { Toast } from 'vant'
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
            this.$store.dispatch('LogOut').then((res)=>{
                Toast('注销成功！');
                this.$router.push({path:'/login'})
            })
        }
    },
};
</script>

<style scoped lang="scss">
.message{
    .text-class{
        text-align: center;
    }
}
</style>
