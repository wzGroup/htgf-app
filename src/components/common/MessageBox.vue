<!--
    toast 提示
    @Author：zhubignshuai
    @Date：2020-6-2
 -->
<template>
    <div class="toastMessageBox" v-show="isShow">{{message}}</div>
</template>
<script>


import "../../assets/css/common/loadMore.scss";
export default {
    name: 'toastMessage',
    props: {
        isShow: Boolean,
        message: {
            type: String,
            default: "温馨提示"
        }
    },
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message = '温馨提示', duration = 1000){
            this.isShow = true;
            this.message = message

            setTimeout(()=>{
                this.isShow = false;
                this.message =''
            }, duration)
        }
    },
};

</script>
