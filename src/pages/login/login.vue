<!--
  视频医生
  @Author：yanruiting
  @Date：20200529
 -->
<template>
  <div>
    <div class="title">股份联调环境登录</div>
    <mt-field  label="手机号:" placeholder="输入手机号" v-model="userPhone"  @input="changeUserPhone"></mt-field>
    <mt-field  label="密码:" placeholder="密码" v-model="phoneCode"  @input="changePhoneCode"></mt-field>
    <mt-field  label="用户类型:" placeholder="机构0，个人1，默认1" v-model="accountType"  @input="changeAccountType"></mt-field>
    <p>用户类型:机构0，个人1，默认1</p>
    <mt-button type="default" size="large" @click="toLogin">登录</mt-button>
  </div>
</template>

<script>

import encryptedData from "@/mixins/encryption";

export default {
  name: 'login',
  data() {
    return {
      userPhone: '13293063029',
      phoneCode: 'aa1234',
      accountType:'1'
    }
  },
  mixins: [ encryptedData ],
  methods: {
    changeUserPhone(value) {
      this.userPhone = value;
    },
    changePhoneCode(value) {
      this.phoneCode = value;
    },
    changeAccountType(value) {
      this.accountType = value;
    },
    toLogin() {
      var that = this;
      this.$axiosHttp.http({
        url: this.$httpConfig.loginUrl,
        data:{
          "mobile": String(that.userPhone), //账号,
          "accountType": String(that.accountType),
          // "password": this.encryptedData(that.phoneCode), //密码
          "password": String(that.phoneCode), //密码
          "registerId": "121c83f760490e8dca2",
          "userAgent": "恒天金交\/0.9.0 (iPhone; iOS 10.1.1; Scale\/3.00)",
          "version": "10.1.1",
          "netType": "1",
          "channelType": "3",
          "brand": "iPhone7Plus",
          "clientIp": "172.16.184.114",
          "deviceId": "9e2d8ca1eda6e5d695b6b719ed28b3dd",
          "accountType": "1",
          // "password": "IsETxTo38vKnDME2ypE1l+tljmTJTFemXZIYA8Lr1lQCUpyO18M3pMLj9xH0kC4VsG52l+p6gSej0K8OxkgSUdGydnkaT/jrdyPLNGE2GB356htx0JxX/mivjtL9zkJkHODQ6T90WGZXsuRpKTvcry0jxAPb7jrm/uZjVKXwoSQ=",
          "ignoreVerify": true,
          "operator": "1"
        },
      },(res) => {
        if(this.$route.query.redirect){
          console.log(this.$route.query.redirect)
          this.$router.push({path:decodeURIComponent(this.$route.query.redirect)})
          console.log(res)
        }else{
          this.$router.go(-1)
        }
      });
    }
  }
};
</script>

<style lang="scss" spoced>

</style>
