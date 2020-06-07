<!--
    我的-设置-关于-服务协议
    @Author：巴双
    @Date：20200527
 -->
<template>
  <div class="about-box">
    <page-title id="pageTitle" title="服务协议" :headerSetting="headerSetting"></page-title>
    <div v-html="content"></div>
    <default-image :showImg="showDefault"></default-image>
   
  </div>
</template>
<script>
import defaultImage from '@/components/common/defaultImage'
import pageTitle from '../../components/common/pageTitle'
export default {
  data() {
    return {
      headerSetting: { //头部的设置参数
        needProcessSelf: "left",
        needBorder:true,
      },
      content:'' ,//富文本
      showDefault:false, //无数据状态
    }
  },
  components: {pageTitle,defaultImage},
  mounted() {
    this.getInitData()
  },
  methods: {
    // 获取接口数据
    getInitData(){
      let that =this
      that.showDefault = false
      that.$axiosHttp.http({
        url: that.$httpConfig.aboutProtocolUrl,
        params: {
          ids:'194', //协议字段说明（恒天股份 服务协议：194  隐私权政策协议：196）
        }
      } ,
      (res) => { //接口成功0000
        that.content = res.data[0].content
        if(!that.content){ //如果内容为空的话，也是无数据
          that.showDefault = true
        }
      },(res) => { // 接口错误4000
        
      },(res) => { // 接口返回1000
        that.showDefault = true
      });
    },
   
  }
};
</script>

<style lang="scss" spoced>
.about-box{
  width: 100%;
  height: 100%;
  background-color: #F7FAFD;
  overflow: auto;
  

}
</style>
