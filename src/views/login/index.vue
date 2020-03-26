<template>
    <div class="login">
        <div class="container">
            <div class="login_from">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {

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
