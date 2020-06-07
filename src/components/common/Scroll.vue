<template>
  <vue-better-scroll class="wrapper ref-wrapper"
                     ref="wtScroll"
                     :style="pullStyle"
                     :listenScroll="onScroll"
                     :scrollbar="scrollbarObj"
                     :pullDownRefresh="pullDownRefreshObj"
                     :pullUpLoad="pullUpLoadObj"
                     :startY="parseInt(startY)"
                     @scroll="scroll"
                     @pullingDown="onPullingDown"
                     @pullingUp="onPullingUp">
    <slot></slot>
  </vue-better-scroll>
</template>

<script>
  import VueBetterScroll from 'vue2-better-scroll'

  export default {
    name: 'xScroll',
    data () {
      return {
        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        scrollbarObj: false,
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullDownRefreshObj: this.disablePullDown ? false : {
          threshold: 90,
          stop: 40,
          txt: ' '
        },
        // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        pullUpLoadObj: this.disablePullUp ? false : {
          threshold: 0,
          txt: {
            more: '加载数据~',
            noMore: ' '
          }
        },
        startY: 0, // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700
      }
    },
    methods: {
      scrollToElement (el, time, x, y) {
        this.$refs.wtScroll.scrollToElement(el, time, x, y)
      },
      scroll (pos) {
        this.$emit('scroll', pos)
        // console.log(pos)
      },
      // 滚动到页面顶部
      scrollTo (x = 0, y = 0, time = 0) {
        this.$refs.wtScroll.scrollTo(x, y, time)
      },
      refresh (flag) {
        setTimeout(() => {
          if (flag) {
            console.log('刷新了列表')
            this.scrollTo()
          } else {
            console.log('停止加载列表')
            this.$refs.wtScroll.refresh()
          }
          this.$refs.wtScroll.forceUpdate(flag)
        }, 20)
      },
      stopRefresh () {
        console.log('停止加载列表')
        this.$refs.wtScroll.refresh()
        this.$refs.wtScroll.forceUpdate(false)
      }
    },
    components: {
      VueBetterScroll
    },
    props: {
      onScroll: {
        type: Boolean,
        default: false
      },
      disablePullDown: {
        type: Boolean,
        default: false
      },
      disablePullUp: {
        type: Boolean,
        default: false
      },
      onPullingDown: {
        type: Function,
        default () {
          return function () {
            console.log('下拉刷新')
            this.$refs.scrollx.forceUpdate(true)
          }
        }
      },
      onPullingUp: {
        type: Function,
        default () {
          return function () {
            console.log('上拉加载')
            this.$refs.scrollx.forceUpdate(true)
          }
        }
      },
      pullStyle: {
        type: Object,
        default () {
          let top = 88
          let height = (document.body.getBoundingClientRect().height - top) + 'px'
          return {
            'height': height
          }
        }
      }
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    position: absolute;
    top: 4.4rem;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    /* background-color: #ffffff; */
  }
</style>
