<!--
    公共弹框组件
    @Author：史芸瑞
    @Date：2020-5-26
    @desc：公共的展示弹框 分为title content和button。其中button支持多按钮。
    @example：memberActivitiesList.vue
 -->
<template>
  <div id="dialog" class="dialog" v-show="show">
    <div class="dialog_mask">
      <div class="dialog_wrapper">
        <div class="dialog_title">{{title}}</div>
        <div class="dialog_content">{{content}}</div>
        <div class="dialog_bottom">
          <button v-for="(item) in buttons" 
          :key="item" 
          @click="processClick($event)">{{item}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dialog-component",
  props: {
    type: {
      //默认的几种样式 1:跳转金服的弹框  2:跳转JJS的弹框
      type: String,
      default: "0"
    },
    title: {
      //标题
      type: String,
      default: "温馨提示"
    },
    content: {
      //内容
      type: String,
      default: ""
    },
    buttons: {
      //下方按钮从左到右文案
      type: Array,
      default: ()=>{
          return ["取消", "确定"]
      }
    },
    show: {
      //控制dialog显示或隐藏
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    // desc: 下方button的点击事件
    // param: 点击的按钮的文案，回传给父控件
    processClick(e) {
      this.$emit("dialogClick", e.currentTarget.innerText);
      if (e.currentTarget.innerText == "取消"){
        this.show = false;
        return false;
      }
      if (e.currentTarget.innerText == "跳转" && this.type != "0"){
        //跳转到金服或JJS
        if (this.type == "1"){
          window.location.href = "toHTJFdialog.html"
        } else if (this.type == "2"){
          window.location.href = "toHTJJSdialog.html"
        }
      }
    }
  },
  mounted(){
    if (this.type == "1"){
      this.content = "跳转至恒天金服";
      this.buttons = ["取消", "跳转"]
    } else if (this.type == "2"){
      this.content = "跳转至恒天JJS"
      this.buttons = ["取消", "跳转"]
    }
  }
};
</script>

<style lang="scss">
.dialog_mask {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: rgba(51, 51, 51, 0.8);

  .dialog_wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(90deg, #f5ecd5 0%, #f0dfba 100%);
    border-radius: 0.14rem;
    width: 5.4rem;
    .dialog_title {
      font-size: 0.28rem;
      line-height: .45rem;
      padding-top: 0.4rem;
      color: #272727;
      font-weight: bold;
      text-align: center;
      border-radius: 0 0 0.3rem 0.3rem;
      
    }
    .dialog_content {
      padding: 1rem;
      text-align: center;
      color: #272727;
      font-size: 0.28rem;
      font-weight: 400;
    }
    .dialog_bottom {
      height: .99rem;
      display: flex;
      width: 100%;
      background: #f7e8c9;
      border-radius: 0 0 0.14rem 0.14rem;
      overflow: hidden; 
      button {
        flex: 1;
        height: 100%;
        text-align: center;
        font-size: 0.33rem;
        color: #272727;
        background: #FDF3DD;
        overflow: hidden;
      }
    }
  }
}
</style>
