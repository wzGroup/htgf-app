<!--
    mint-ui无限加载，上拉加载时显示的loading圈
    @Author zhubingshuai
    @Date：2020-5-27

 -->
<template>
    <div class="loadingBox">
        <div class="loadingInner">
            <img src="../../assets/img/loading.gif" class="image" />
        </div>
    </div>
</template>
<script>


import "../../assets/css/common/loadMore.scss";
export default {
    name: 'Indicator',
    data() {
        return {
        }
    },
};

</script>
<style lang="scss">
.loadingBox{
    .loadingInner{
        position:absolute;
        width: 2.64rem; 
        height: 2.64rem; 
        top: 50%; 
        left: 50%; 
        margin-left: -1.32rem; 
        margin-top: -1.32rem; 
        background:rgba(255,255,255,0.7); 
        vertical-align: center; 
        border-radius: 0.3rem;
        z-index: 9999;
        .image{
            width: 2.2rem; 
            height: 2.2rem; 
            position: absolute;
            left: 50%;
            top: 50%; 
            margin-left: -1.1rem; 
            margin-top: -1.1rem
        }
    }
}
</style>