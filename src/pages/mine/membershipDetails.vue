<!--
    会员权益详情页
    @Author：zhubingshuai
    @Date：2020-5-26
 -->
<template>
    <div id="membershipDetailsBox">
        <!-- title -->
        <page-title title="权益详情" :headerSetting="headerSetting"></page-title>
        <div class="membershipDetailsSilderBgBox"></div>
        <div class="membershipDetailsSilderBox" v-if="!showDefault">
             <!-- swiper 图标 -->
            <div class="swiper-container show-swiper swiper-container-horizontal swiper-container-ios">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" style="margin-right: 17px;" v-for="(item, index) in items" :key="index" :data-title="item.text">
                        <div class="goods" >
                            <img class="lazyload" :src="item.iconUnlock" :data-original="item.iconUnlock">
                            <p>{{item.rightName}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 具体内容页面 -->
            <div class="membershipDetailsContentBox">
                <div class="membershipDetailsContentBox_next">
                    <h2>{{contentBoxRightName}}</h2>
                    <p>{{contentBoxContent}}</p>
                    <div class="title-tel">
                        <span class="title">更多信息可通过恒天财富官方客服热线进行咨询</span>
                        <a href="javascript:void(0);" class="tel">400-8980-618</a>
                    </div>
                </div>
            </div>
        </div>
        <default-image :showImg="showDefault"></default-image>
    </div>
</template>
<script>
import pageTitle from "../../components/common/pageTitle";
import defaultImage from '@/components/common/defaultImage'
import Swiper from "swiper";
export default {
  data() {
    return {
      items: [
        // {
        //   id: "1",
        //   enjoy: "0",
        //   rightName: "金融产品诊断",
        //   iconUnlock: "../assets/img/membership/quanyi_icon_big@2x.png",
        //   iconLocked: "1",
        //   content:
        //     "集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。1",
        //   linkUrl: "www.baidu.com"
        // },
        // {
        //   id: "1",
        //   enjoy: "0",
        //   rightName: "SPA护理",
        //   iconUnlock: "../assets/img/membership/quanyi_icon_big@2x.png",
        //   iconLocked: "1",
        //   content:
        //     "集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。2",
        //   linkUrl: "www.baidu.com"
        // },
        // {
        //   id: "1",
        //   enjoy: "0",
        //   rightName: "私人牙医",
        //   iconUnlock: "/mine/static/img/home_icon_xejx@2x.png",
        //   iconLocked: "1",
        //   content:
        //     "集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。3",
        //   linkUrl: "www.baidu.com"
        // },
        // {
        //   id: "1",
        //   enjoy: "0",
        //   rightName: "高尔夫畅打",
        //   iconUnlock: "/mine/static/img/home_icon_gmzh@2x.png",
        //   iconLocked: "1",
        //   content:
        //     "集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。4",
        //   linkUrl: "www.baidu.com"
        // },
        // {
        //   id: "1",
        //   enjoy: "0",
        //   rightName: "运动至上",
        //   iconUnlock: "/mine/static/img/mine_icon_wdhd@2x.png",
        //   iconLocked: "1",
        //   content:
        //     "集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。5",
        //   linkUrl: "www.baidu.com"
        // }
      ],
      contentBoxRightName: "", //内容title
      contentBoxContent: "", //内容详情
      slide: 0,
      slideProgress: 0,
      prevIndent: 0,
      scale: 0,
      activeIndex:0,
      swiperIndex: 0,
      //头部的设置参数
      headerSetting: {
        needProcessSelf: "right"
      },
      showDefault: false, //是否有详情
      // swiper配置项
      swiperOption: {}
    };
  },
  components: {
    pageTitle,
    defaultImage,
    Swiper
  },
  created() {
  },
  mounted() {
    this.getData()
    this.swiperIndex = this.$route.query.index || 0
  },
  methods: {
    getData() {
      var that = this;
      that.showDefault = false
        this.$axiosHttp.http({
            // loading: true,
            url: this.$httpConfig.membershipDetailUrl,
            data: {
                level: '7' // 传最高就行，可以固定写死，拿所有的权益
            },
          method: "POST"
        },(res) => {
            var res = res.data;
            that.items = res
            that.$nextTick(function () {
              that.swiperInit(parseInt(that.swiperIndex), res.length)
          })
        },res => { // 接口返回1000
					that.showDefault = true
				});
    },
    swiperInit(n, num){
        var that = this;
        //获取滑动图片的起始位置
        var xPX = 100 * (this.$el.clientWidth / 750) * 0.5;
        //获取每个滑动图片的外边距
        var marW = 100 * (this.$el.clientWidth / 750) * 0.5;
        var swiperShow = new Swiper(".show-swiper", {
            slidesPerView: "auto", //
            // watchSlidesProgress: !0,            
            // watchSlidesVisibility : true,
            slidesOffsetBefore: xPX,
            spaceBetween: marW,
            resistanceRatio: 1,
            initialSlide: n, //图片滑动到第几个未开始位置
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, //修改swiper的父元素时，自动初始化swiper
            loop: true, //是否循环
            // slideDuplicatedActiveClass : 'my-slide-duplicate-active',
            on: {
                progress: function(b) {
                    for (var i = 0; i < this.slides.length; i++) {
                        // that.slide = this.slides.eq(i);
                        // that.slideProgress = this.slides[i].progress;
                        // that.prevIndent = 4 == i ? 0.3228 : 0.0898;
                        // that.scale = 1 > Math.abs(that.slideProgress + that.prevIndent) ? 0.4 * (1 - Math.abs(that.slideProgress + that.prevIndent)) + 1 : 1;
                        // that.slide.find(".goods").transform("scale3d(" + that.scale + "," + that.scale + ",1)");
                        var slide = this.slides.eq(i);
                        var slideProgress = this.slides[i].progress, modify = 1;
                        if (Math.abs(slideProgress) > 1) {
                            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                        }
                        var translate = slideProgress * modify * 750 + 'px';
                        var scale = 1 - Math.abs(slideProgress) / 4;
                        var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                        slide.find(".goods").transform('translateX(' + translate + ') scale(' + scale + ')');
                    }
                },
                //滑动中
                setTransition: function(b) {
                    for (var a = 0; a < this.slides.length; a++) {
                        this.slides.eq(a).find(".goods").transition(b);
                    }
                },
                //滑动结束赋值
                slideChangeTransitionEnd: function() {
                    console.log(this.realIndex)
                    // that.activeIndex = this.realIndex
                    // var temi = this.activeIndex % num;
                    that.items.forEach((item, index) => {
                        if (this.realIndex == index) {
                            that.contentBoxRightName = item.rightName;
                            that.contentBoxContent = item.content;
                        }
                    });
                }
            }
        });
    },
  }
};
</script>
<style lang="scss" spoced>
#membershipDetailsBox {
  width: 100%;
  min-height: 3.2rem;
  height: 100%;
  position: relative;
  overflow: auto;
  .pageTitle{
    position: relative;
    
  }
  .pTitle{
      color: #fff;
      background: transparent;
      .title{
        color: #fff
      }
    }
  .membershipDetailsSilderBgBox {
    position: absolute;
    width: 100%;
    height: 3.2rem;
    background: url("../../assets/img/membership/xiangqing_head_bg@2x.png")
      no-repeat center center;
    background-size: 100% 100%;
    left: 0;
    top: 0;
    border-radius: 0 0 0.3rem 0.3rem;
  }
  .membershipDetailsHeaderBox {
    height: 0.88rem;
    font-size: 0.34rem;
    text-align: center;
    position: relative;
    line-height: 0.88rem;
    a {
      position: absolute;
      width: 0.88rem;
      height: 0.88rem;
      left: 0;
      top: 0;
      font-size: 0.36rem;
    }
  }
  .membershipDetailsBodyBox {
    position: relative;
    .membershipDetailsBodyTopBox {
      height: 1.92rem;
      border-radius: 0 0 0.3rem 0.3rem;
    }
  }
  .membershipDetailsSilderBox {
    position: relative;
    padding-top: 1.6rem;
    overflow: hidden;
    .membershipDetailsContentBox {
      width: 90%;
      background-image: url("../../assets/img/membership/quanyi_card_bg@2x.png");
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: 0 0.02rem 0.26rem 0 rgba(221, 221, 221, 0.5);
      border-radius: 0.2rem;
      min-height: 7.84rem;
      margin: 0.5rem auto 0.92rem;
      position: relative;
      .membershipDetailsContentBox_next {
        padding: 0 0.35rem 0.6rem 0.35rem;
        img {
          width: auto;
          max-width: 100%;
        }
        h2 {
          display: inline;
          margin: 0.4rem 0;
          font-size: 0.44rem;
          height: 1.94rem;
          line-height: 1.94rem;
          color: rgba(39, 39, 39, 1);
          background: linear-gradient(239deg, rgba(187, 142, 95, 1) 0%, rgba(108, 69, 23, 1) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: bold;
        }
        p {
          font-size: 0.28rem;
          text-align: justify;
          line-height: 0.5rem;
        }

        .title {
          font-size: 0.24rem;
          color: #9b9b9b;
          text-align: center;
          display: block;
          margin-bottom: 0.1rem;
        }
        .title-tel {
          position: absolute;
          bottom: 0;
          left: 0.66rem;
          height: 2.1rem;
        }

        .tel {
          font-size: 0.24rem;
          color: #be894d;
          text-align: center;
          display: block;
        }
        .linkBtnBox {
          text-align: center;
          margin-top: 0.16rem;
          height: 0.8rem;
          position: relative;
          a {
            width: 4.1rem;
            height: 0.8rem;
            display: inline-block;
            border-radius: 0.04rem;
            font-size: 0.32rem;
            letter-spacing: 0;
            line-height: 0.8rem;
          }
        }
      }
    }
  }
}
#taobao-best {
  position: relative;
}

.show-swiper {
  z-index: 3;
}
.swiper-container {
  overflow: initial;
  padding-left: .17rem;
}
.show-swiper .swiper-slide {
  width: 1.6rem;
  height: 1.6rem;
}
.show-swiper .swiper-slide-active {
    // transform: scale(1.4);
  .goods {
    transform: scale(1.4);
    p {
      font-weight: bold;
      // transform: scale(0.9);
    }
  }
}
.show-swiper .swiper-slide .goods {
    width: 1.45rem;
    height: 1.45rem;
    text-align: center;
    background: url("../../assets/img/membership/quanyi_icon_big@2x.png") no-repeat center center;
    // background-size:100% 100%;
    border-radius: .16rem;
    position: relative;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  img {
    width: 0.75rem;
    height: 0.75rem;
  }
  p {
    font-size: 0.24rem;
    margin-top: .05rem;
    color: #6C4517;
  }
}
</style>


