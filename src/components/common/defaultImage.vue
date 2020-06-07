<!--
    无数据默认图片，imgTopStyle: 传margin-top调整图片距离
    @Author：bashuang
    @Date：20200528
 -->
<template>
  <div class="no-data-wrap" v-show="showImg">
      <img src="../../assets/img/no_data_img.png" alt="" ref="noDataImg" :style="imgTopStyle ? imgTopStyle: ''">
      <div>{{text}}</div>
  </div>
</template>
<script>

  export default {
    name: "defaultImage",
    props:{
        imgTopStyle: { //调整暂无数据图片的位置
            type: String,
            default: ''
        },
        showImg:{ //显示隐藏
          type: Boolean,
          default: true
        },
        text:{ //提示文字
          type: String,
          default: '暂无数据'
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
    },
  }
</script>
<style lang="scss">
  .no-data-wrap{
    width: 100%;
    height: auto;
    background-color: #FFFFFF;
    overflow:hidden;
    >img{
      display: block;
      width: 3.44rem;
      height: 2.08rem;
      margin:50% auto .17rem;
    }
    >div{
      /* display: block */
      color: #272727;
      height:0.48rem;
      font-size:.34rem;
      font-weight:500;
      line-height:0.48rem;
      text-align: center
    }
  }
</style>
