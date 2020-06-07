<template>
  <div ref='noData' class="noDataInfo">
    <div class="headCon">
      <div class="imgBg"></div>
    </div>
    <div class="echartsWrap">
        <div class="wrapper">
            <div class='echartsCon' ref="fpEcharts">
              <div class="noDataInner">
                <img src="../assets/img/noData.png" />
                <p>您暂无查看权限</p>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  // import "../assets/css/hrm/common.scss";
  export default {
    name: "noData",
    data(){
      return {
      }
    },
    created(){
    },
    mounted(){
      // Indicator.close();
      this.getHeight();
    },
    methods:{
      getHeight(){
        // 获取屏幕的高度
        let appHeight = document.body.offsetHeight;
        // let paddingHeight = document.getElementsByClassName("content")[0].style.paddingBottom;
        // 获取头和底的高度
        let topHeight = document.getElementById("pageTitle").offsetHeight;
        let bottomHeight = document.getElementById("bottomTab").offsetHeight;
        this.$refs.noData.style.height = appHeight-topHeight-bottomHeight+'px';
      }
    }
      

  }
</script>
<style lang = 'scss'>
  .noDataInfo{
    width: 100%;
    /* background : #fff; */
    /* box-sizing: content-box;
    padding-bottom: 1rem; */
    .headCon {
      padding-top: 0.75rem;
      .imgBg{
        height: 9.25rem;
        background: url('../assets/img/hrm/bg.png');
        background-size: 100% 100%;
      }
    }
  }
  
    .page .noDataInfo .echartsWrap{
      display: block;
      margin-top: 0;
      height: calc(100% - 1.55rem);
      .wrapper{
        height: 100%;
      }
    }
</style>
