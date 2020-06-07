
<!--
    toast 提示
    @Author：zhubignshuai
    @Date：2020-6-4
 -->
<template>
    <div id="richTemplateWrap" class="articleTemplate">
        <page-title :title="title" :headerSetting="headerSetting"></page-title>
        <div id="contentWrap" v-if="!showDefault">
            <div :class="serviceContentPadding ? 'doctorBottom padding_left_right':'doctorBottom'" v-html="contenthtml"></div>
        </div>
        <default-image :showImg="showDefault"></default-image>
    </div>
</template>
<script>
import pageTitle from '@/components/common/pageTitle';
import splitUrl from '../../utils/splitUrl'
import defaultImage from '@/components/common/defaultImage'

export default {
  name: 'videoDoctor',
  data() {
    return {
      headerSetting: {
        needProcessSelf: "right",
        needBorder: false
      },
      articleBelong:0,
      showDefault:false, //无数据状态
      id: 0,
      title:'',
      contenthtml: '默认内容', // 内容
      serviceContentPadding: true // 是否设置padding为30px
    }
  },
  components: { pageTitle, defaultImage },
  mounted() {
    this.id = this.$route.query.id || ''
    this.articleBelong = this.$route.query.articleBelong || ''
    // 获取文章
    this.getArticle();
  },
  methods: {
    // 获取文章
    getArticle() {
      var that = this;
      that.showDefault = false
      this.$axiosHttp.http({
        url: this.$httpConfig.getArticleUrl,
        data: {
            id: that.id,
            articleBelong: that.articleBelong,
            applyType: "0",//h5是0
        },
      },(res) => {
          this.title = res.data.pageTitle
          this.contenthtml = res.data.content
      },res => { // 接口返回1000
		    that.showDefault = true
	    });
    }
  }
};
</script>
<style lang="scss" spoced>
.artHeaderCont{
    >img{
        width: auto;
        max-width: 100%;
    }
    .artImg{
        width: 100%;
        position:relative;
        img{
            width: auto;
            max-width: 100%;
        }
        span{
            display:inline-block;
            background: #FFF;
            width: 0.4rem;
            height:0.4rem;
            position: absolute;
            top:50%;
            left: 50%;
            margin:-0.2rem 0 0 -0.2rem;

        }
    }
    .artTitle{
        padding:0.3rem;
        p{
            font-size: 0.44rem;
            font-weight:500;
            color: #000;
            line-height:0.68rem;
        }
    }
    .videoButton{

        display:none;
        .mask{
            display:inline-block;
            position:absolute;
            left: 0;
            top:0;
            width: 100%;
            height:100%;
            background:rgba(0, 0, 0, 0.2);
        }

    }

    .videoPlayIcon{
        position: absolute;
        top:50%;
        left:50%;
        margin:-0.35rem 0 0 -0.35rem;
    }
    .audioPlay {
        background:rgba(243,245,247,1);
        border-radius:8px;
    }
    .play{
        height: auto;
        background:transparent;
    }
    #audioPlayer{
        margin-top: 0.05rem;
        padding-top:0.05rem;
        padding-right:0.05rem;
    }


}
#richTemplateWrap{
    .doctorBottom {
        &.padding_left_right {
            padding:0 0.3rem;
        }
        img {
            width: 100%;
        }
    }
}
#contentWrap *{
    max-width: 100%!important;
}
</style>

