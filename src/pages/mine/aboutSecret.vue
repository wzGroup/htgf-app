<!--
    我的-设置-关于-隐私政策协议
    @Author：巴双
    @Date：20200527
 -->
<template>
  <div class="about-box">
    <page-title id="pageTitle" title="隐私权政策协议" :headerSetting="headerSetting"></page-title>
    <div v-show="!showDefault && src">
      <pdf
        :src="src" 
        :page="currentPage"
        @num-pages="pageCount=$event"
        @page-loaded="currentPage=$event"
        @loaded="loadPdfHandler"> 
    </pdf>
    </div>
    <p class="arrow" v-show="showPage">
        <span @click="changePdfPage(0)" class="turn">上一页</span>
        {{currentPage}} / {{pageCount}}
        <span @click="changePdfPage(1)" class="turn">下一页</span>
    </p>
    <default-image :showImg="showDefault"></default-image>
  
  </div>
</template>
<script>
import pdf from "vue-pdf";
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
      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: 'pdf', // 文件类型
      src: '', // pdf文件地址
      showPage:false, //是否显示页码
    }
  },
  components: {pageTitle,defaultImage,pdf},
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
          ids:'196'//协议字段说明（恒天股份 服务协议：194  隐私权政策协议：196）
        }
      } ,
      (res) => { //接口成功0000
        let resData = res.data[0].accessorys[0]
        that.src=that.$urls.domain+that.$httpConfig.pdfDownloadUrl+"?name="+Base64.encode(resData.accessoryName)+"&show=1&url="+resData.accessoryUrl
        let timer;
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => { //未实名认证的，关闭页面
          timer = null
          that.showPage = true
        }, 1000)
      },(res) => { // 接口错误4000
        
      },(res) => { // 接口返回1000
        that.showDefault = true
      });
    },
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage (val) {
        if (val === 0 && this.currentPage > 1) {
        this.currentPage--
        }
        if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
        }
    },
    // pdf加载时
    loadPdfHandler (e) {
        this.currentPage = 1 // 加载的时候先加载第一页
        //Indicator.close()
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
  .arrow{
      display: block;
      width: 100%;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      padding:0 .38rem 0 .38rem
  }

}
</style>
