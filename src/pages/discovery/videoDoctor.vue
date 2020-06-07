<!--
  视频医生
  @Author：yanruiting
  @Date：20200528
 -->
<template>
  <div>
    <!-- 头部 -->
    <page-title title="视频医生" :headerSetting="headerSetting" @headerClickCallBack="headerClickCallBack">
      <span slot="header_right" class="viewCaseBtn" v-if="isConform==1" htmdEvt="videoDoctor_01">查看病历</span>
    </page-title>
    <!-- banner -->
    <div class="doctorTop">
      <div class="bannerWrapper">
        <div class="bannerCon" v-html="bannerImg"></div>
        <img src="../../assets/img/wave@2x.png" alt="">
      </div>
      <div class="callDoctor" v-if="isConform==1" @click="callDoctor" htmdEvt="videoDoctor_02"></div>
    </div>
    <!-- 是否开通和缓服务提示 -->
    <div class="noDredgeDesc" v-if="isConform!=1">
      <div class="descBlue toCustomer" v-html="serviceHint"></div>
    </div>
    <!-- 提示线 -->
    <div class="transverseLineCon">
      <div class="transverseLine"></div>
    </div>
    <!-- 医生服务内容 -->
    <div :class="serviceContentPadding ? 'doctorBottom padding_left_right':'doctorBottom'" v-html="serviceContent"></div>
  </div>
</template>

<script>
import pageTitle from '@/components/common/pageTitle';
import banner from '@/assets/img/banner@2x.png';

export default {
  name: 'videoDoctor',
  data() {
    return {
      headerSetting: {
        needProcessSelf: "right",
        needBorder: false
      },
      bannerImg: '<img src="'+ banner +'" alt="">',
      userToken: '', // 和缓客户唯一标识
      isConform: '', // 和缓服务是否开通 1:开通，2：未开通，3：已过期
      serviceContent: '', // 医生服务内容
      serviceHint: '', // 是否开通和缓服务提示
      serviceContentPadding: true // 是否设置padding为30px
    }
  },
  components: { pageTitle },
  mounted() {
    // 获取banner图地址
    this.getArticle('4');
    // 判断客户等级是否满足条件（是否开通和缓服务，是否过期）
    this.judgeCustomerCondition();
    // 获取医生服务内容
    this.getArticle('5');
  },
  methods: {
    // 判断客户等级是否满足条件（是否开通和缓服务，是否过期）
    judgeCustomerCondition() {
      var that = this;
      this.$axiosHttp.http({
        url: this.$httpConfig.checkVideoDoctorUrl
      },(res) => {
        res.data.isConform && (that.isConform = res.data.isConform);
        res.data.userToken && (that.userToken = res.data.userToken);
        res.data.failureMsg && (that.serviceHint = res.data.failureMsg);
      });
    },
    // 4 获取banner图地址 5 获取医生服务内容
    getArticle(articleBelong) {
      var that = this;
      this.$axiosHttp.http({
        url: this.$httpConfig.getArticleUrl,
        data: {
          articleBelong: articleBelong,
          applyType: 1,
        }
      },(res) => {
        if(articleBelong == 4) {
          res.data.content && (that.bannerImg = res.data.content);
        } else if (articleBelong == 5) {
          res.data.content && (that.serviceContent = res.data.content);
        }
      });
    },
    // 查看病历跳转
    headerClickCallBack(type){
      let param = {
        userToken: this.userToken
      }
      this.$urls.routerPush(this, this.$urls.caseList, param, true)
    },
    // 呼叫医生
    callDoctor() {
      let param = {
        userToken: this.userToken
      }
      this.$urls.routerPush(this, this.$urls.callDoctor, param, true)
    }
  }
};
</script>

<style lang="scss" spoced>
.viewCaseBtn {
  position: absolute;
  width: 1.5rem;
  right: 0;
  font-size: .3rem;
  color: #BB8E5F;
}
.doctorTop {
  position: relative;
  .bannerWrapper {
    position: relative;
    .bannerCon {
      img {
        width: 100%;
      }
    }
    &>img {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
  &>.callDoctor {
    width: 2.86rem;
    height: 1rem;
    margin: auto;
    background: url("../../assets/img/ljhjys@2x.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.noDredgeDesc {
  font-size: .26rem;
  line-height: .4rem;
  text-align: center;
  .descBlue {
    color: #0E246C;
    white-space: pre;
  }
}
.transverseLineCon {
  padding: .4rem .3rem 0;
  .transverseLine {
    border-top: 1px solid #E7E9ED;
  }
}
.doctorBottom {
  &.padding_left_right {
    padding:0 0.3rem;
  }
  img {
    width: 100%;
  }
}
</style>
