<!--
    任务管理-接口返回无数据时显示组件
    @Author：bashuang
    @Date：20200414
 -->
<template>
  <div class="url-no-data">
      <img src="../../assets/img/nodata3.png" alt="" :style="imgTop? imgTop : ''">
      <!--<span>暂无任务</span>-->
      <span v-if="tipName" :style="tipTop? tipTop : ''">{{tipName}}</span>
      <span v-else>暂无任务</span>
  </div>
</template>
<script>

import $ from 'jquery'
  export default {
    name: "UrlNoData",
    props:{
        tipName: { //暂无数据图片下方的提示语
            type: String,
            // default: 'gray'
        },
        imgTop: { //调整暂无数据图片的位置
            type: String,
            default: '4.6rem'
        },
        tipTop: { //调整暂无数据时提示语位置
            type: String,
            default: ':9.8rem'
        },
        height:{
          type: String
        }
    },
    created(){
    },
    mounted(){
      if(this.height == 'max'){
        $('.url-no-data').height(document.body.scrollHeight-44)
      }
    },
    methods:{
    }
  }
</script>
<style lang="scss">
  .url-no-data{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    >img{
      display: block;
      width: 10.75rem;
      height: 4.7rem;
      position: absolute;
      top:6.85rem;
      left:50%;
      transform: translateX(-50%);
    }
    >span{
      /* display: block */
      color: #C1C5CE;
      font-size:.8rem;
      line-height: 1rem;
      position: absolute;
      top:12.05rem;
      left:50%;
      transform: translateX(-50%);
    }
  }
</style>
