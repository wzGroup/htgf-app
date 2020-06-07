<!-- 
    任务管理首页-下拉加载最终无数据时，显示组件
    @Author：bashuang
    @Date：20200413
 -->
<template>
  <div class="noDataEnd" :style="bgColor == 'fff' ? 'background-color:#FFFFFF' : ''">
    <div class="endContent">
      <span class="endText">已经到底了</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NoDataEnd",
    props:{
      bgColor: { //背景颜色，默认灰色#F2F3F5,另有白色传值‘white’：#FFFFFF
        type: String,
        default: 'gray'
      },
    },
    created(){
    },
    mounted(){
    },
    methods:{
    }
  }
</script>
<style lang="scss">
  /* 已经到底了 */
.noDataEnd{
  width: 100%;
  height: 2.85rem;
  background-color: #F2F3F5;
  position: relative;
  .endContent{
    // width: 6.95rem;
    height: .85rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top:1rem;
    left:50%;
    transform: translateX(-50%);
    color: #B2B6BF;
  }
  .endText{
    display: block;
    // width: 3rem;
    height: .85rem;
    margin:0 .35rem;
    font-size: .6rem;
    line-height: .85rem
  }
}
.endContent:before{
  content: "";
  display: block;
  width: 1.625rem;
  height:.025rem;
  background-color: #C1C5CE

}
.endContent:after{
  content: "";
  display: block;
  width: 1.625rem;
  height: .025rem;
  background-color: #C1C5CE
}
</style>
