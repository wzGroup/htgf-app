<!--
    会员活动列表
    @Author：史芸瑞
    @Date：2020-5-26
 -->

<template>
  <div id="member_activities_list">
    <page-title title="会员活动"
                :headerSetting='headerSetting.needBorder'>
      <mt-search slot="header_center"
                 v-model="searchValue"
                 cancel-text=""
                 placeholder="请输入活动名称"
                 class="search">
      </mt-search>

      <div slot="header_right"
           id="current_city">
        <!-- 选择城市页面 -->
        <div class="activityCityBox"
             @click="choiceCity()">
          <div class="choice">{{this.actConductCity}}
          </div>
          <span class="iconfont dropList">&#xe609;</span>
        </div>
        <!-- 选择城市页面结束 -->
      </div>
    </page-title>

    <div class="nav">
      <div @click="active = 'tab-container1'"
           :class="{'selected': active == 'tab-container1'}">即将上线</div>
      <div @click="active = 'tab-container2'"
           :class="{'selected': active == 'tab-container2'}">进行中</div>
      <div @click="active = 'tab-container3'"
           :class="{'selected': active == 'tab-container3'}">已结束</div>
    </div>

    <div class="page-tab-container">
      <mt-tab-container class="page-tabbar-tab-container"
                        v-model="active"
                        swipeable>
        <mt-tab-container-item id="tab-container1">
          <list-load-more @loadMore="loadMore"
                          @refresh="refresh">
            <div v-show="!listLoading"
                 v-for="(item) in listInfo1"
                 :key="item.id"
                 @click="switchToDetail(item)"
                 class="card">
              <div class="activityListBox">
                <i v-if="item.prizeFlag">{{item.prize}}</i>
                <img class="lazyload"
                     :src="item.actImgUrl?item.actImgUrl:img" />
                <span v-if="item.isPlayback"
                      class="replayBtn">观看回放</span>
              </div>
              <div class="activityListBottomBox">
                <h5>{{item.actName}}</h5>
                <p v-if="item.isLive">
                  <i>直播时间</i>
                  {{item.actPlayTimeMark}}
                </p>
                <p v-if="item.actStartDate">
                  <i>活动时间</i>
                  {{item.actStartDate}}至{{item.actEndDate}}
                </p>
              </div>
            </div>
          </list-load-more>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <list-load-more @loadMore="loadMore"
                          @refresh="refresh">
            <div v-show="!listLoading"
                 v-for="(item) in listInfo2"
                 :key="item.id"
                 @click="switchToDetail(item)"
                 class="card">
              <div class="activityListBox">
                <i v-if="item.prizeFlag">{{item.prize}}</i>
                <img class="lazyload"
                     :src="item.actImgUrl?item.actImgUrl:img" />
                <span v-if="item.isPlayback"
                      class="replayBtn">观看回放</span>
              </div>
              <div class="activityListBottomBox">
                <h5>{{item.actName}}</h5>
                <p v-if="item.isLive">
                  <i>直播时间</i>
                  {{item.actPlayTimeMark}}
                </p>
                <p v-if="item.actStartDate">
                  <i>活动时间</i>
                  {{item.actStartDate}}至{{item.actEndDate}}
                </p>
              </div>
            </div>
          </list-load-more>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <list-load-more @loadMore="loadMore"
                          @refresh="refresh">
            <div v-show="!listLoading"
                 v-for="(item) in listInfo3"
                 :key="item.id"
                 @click="switchToDetail(item)"
                 class="card">
              <div class="activityListBox">
                <i v-if="item.prizeFlag">{{item.prize}}</i>
                <img class="lazyload"
                     :src="item.actImgUrl?item.actImgUrl:img" />
                <span v-if="item.isPlayback"
                      class="replayBtn">观看回放</span>
              </div>
              <div class="activityListBottomBox">
                <h5>{{item.actName}}</h5>
                <p v-if="item.isLive">
                  <i>直播时间</i>
                  {{item.actPlayTimeMark}}
                </p>
                <p v-if="item.actStartDate">
                  <i>活动时间</i>
                  {{item.actStartDate}}至{{item.actEndDate}}
                </p>
              </div>
            </div>
          </list-load-more>
        </mt-tab-container-item>
      </mt-tab-container>
        <city-picker :is-show.sync="city.isShow"
                     @onChoose="onChoose"
                     :localCity="this.actConductCity"
                     :close="close">
        </city-picker>
    </div>
    <!-- city-begin -->

    <!-- city-end -->
  </div>
</template>

<script>
import img from "@/assets/img/top_banner.png";
import cityPicker from "../../components/common/cityPicker";
import pageTitle from "../../components/common/pageTitle";
import listLoadMore from "../../components/common/listLoadMore";
import timeFormat from "../../utils/common"
import "@/assets/css/pages/memberClub/memberActivitiesList.scss";
import {
    Toast
} from 'mint-ui';

export default {
  components: { pageTitle, listLoadMore, cityPicker },
  data () {
    return {
      active: "tab-container1", //当前选中的item
      actName: "即将上线", //当前选中item的名字
      actStatus: "0", //当前选中item的状态
      startPage: 1,
      actConductCity: "北京", //当前选中的城市
      listInfo1: [], //列表数据
      listInfo2: [], //列表数据
      listInfo3: [], //列表数据
      listLoading: false, //列表是否加载中
      searchValue: "",
      img: img, //图片懒加载
      youChoiceCityName: "",// 已选择的城市
      // 城市选择页面所需数据
      city: {
        isShow: false,//显示城市选择模块是否隐藏
      },
      headerSetting: {
        needBorder: false, //pageTitle 没有border
      }
    };
  },
  created () {
    this.getCurrentList(); //获取List页面的列表
      this.getCityPickerCity();
  },
  methods: {
    //获取当前页面的列表
    //param1: 下拉刷新上拉加载的成功回调
    //param2: 下拉刷新上拉加载的失败回调
    getCurrentList (resolve, reject) {
      let that = this;
      this.$axiosHttp.http(
        {
          url: this.$httpConfig.getActivitiesListUrl,
          data: {
            startPage: this.startPage,
            pageSize: 10,
            actName: '', //tab名字 即将上线、进行中、已结束
            actStatus: this.actStatus, //tab状态  0、1、2
            actConductCity: this.actConductCity //选择的地点
          }
        },
        res => {
          var res = res.data;
          console.log(res)
          //todo 这里绑定数据
            res.activityVoPageInfo.list.map(item=>this.$moment(item.actStartDate).format("YYYY-DD-MM"))
            if (that.actStatus == "0") {
            // console.log(res.activityVoPageInfo.list);
            that.listInfo1 = res.activityVoPageInfo.list
          } else if (that.actStatus == "1") {

            that.listInfo2 = res.activityVoPageInfo.list
          } else if (that.actStatus == "2") {

            that.listInfo3 = res.activityVoPageInfo.list
          }
          if (resolve) {
            //下拉刷新上拉加载成功的回调
            resolve(res.status);
          }
        },
        error => {
          if (reject) {
            //下拉刷新上拉加载失败的回调
            reject();
          }
        }
      );
    },
    // //获取城市列表
    // getCurrentCity () {
    //     let res='{"message":"操作成功！","status":"0000","data":{"hotCityList":[{"regionId":"1","code":"120000","regionName":"天津","parentId":"120000","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"11","regionName":"北京","parentId":"11","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"上海","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"深圳","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"广州","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"武汉","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"鞍山","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"安庆","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"安阳","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"}],' +
    //         '"cityMap":{"A":[{"regionId":"1","code":"1","regionName":"鞍山","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"安庆","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"阿拉善盟","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"阿里地区","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"安康","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"B":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"C":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"D":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"E":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"F":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}]}}}'
    //   let that = this;
    //  /* this.$axiosHttp.http(
    //     { url: this.$httpConfig.cityListUrl },
    //     res => {*/
    //       const { data } = JSON.parse(res)
    //       this.city.cityData = data.cityMap;
    //       this.city.hotCity = data.hotCityList;
    //       //获取当前列表
    //       that.getCurrentList()
    //   /*  }
    //   );*/
    // },
    //获取当前城市
    getCityPickerCity () {
      let that = this
      this.$axiosHttp.http(
        { url: this.$httpConfig.getCityUrl },
        res => {
          //拿到当前城市
           this.actConductCity = res.data.cityName;
          //获取当前列表
          that.getCurrentList()
        }
      );
    },
    // 选择城市之后
    onChoose (res) {
      this.city.isShow = false;
      this.actConductCity = res.regionName;
      this.getCurrentList();
    },
    //上拉加载更多
    loadMore (pageNp, resolve, reject) {
      this.startPage += 1;
      this.getCurrentList(resolve, reject);
    },
    //下拉刷新
    refresh (resolve, reject) {
      this.startPage = 1;
      this.getCurrentList(resolve, reject);
    },
    //跳转到详情页
    switchToDetail (item) {
      let param = {
        actType: item.actType,
        actId: item.actId,
        isNeedLogin: 0,
        appNewWebView: 1,
      }
      this.$urls.routerPush(this, "/memberActivitiesDetail", param);
    },
    //点击当前城市之后
    choiceCity: function () {
      // 城市列表页显示
      this.city.isShow = true;
    },
    close () {
      this.city.isShow = false;
    }
  },
  watch: {
    active (val, oldVal) {
      //监听页面的切换 val为切换至的mt-tab-container-item的id
      if (val == "tab-container1") {
        //即将上线
        this.actName = "即将上线";
        this.actStatus = 0;
      } else if (val == "tab-container2") {
        //进行中
        this.actName = "进行中";
        this.actStatus = 1;
      } else if (val == "tab-container3") {
        //已结束
        this.actName = "已结束";
        this.actStatus = 2;
      }
      this.startPage = 1;
      this.getCurrentList();
    },
    //监听输入框的输入值
    searchValue (val, oldVal) {
      //搜索列表
      this.actName = val;
      this.startPage = 1;
      this.getCurrentList();
    }
    //监听地点的变化
  }
};
</script>
