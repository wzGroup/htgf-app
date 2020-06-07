<template>
    <transition name="slide">
        <div class="widget-citys animated"
             v-if="isShow">
            <div class="widget-citys-content">
                <div class="widget-citys-header bdb">
                    <a href="javascript:void(0)"
                       @click="hide"
                       class="iconfont">&#xe656;</a>
                </div>
                <div class="widget-citys-local bdb">当前城市：{{localCity  || "无法定位当前城市"}}</div>
                <div class="widget-citys-list">
                    <dl>
                        <template v-for="(item, index) in letterList">
                            <template v-if="index == 'hot'">
                                <dt class="exColor"><em class="hot-big"></em>热门城市</dt>
                            </template>
                            <template v-else>
                                <dt>{{index}}</dt>
                            </template>
                            <template v-for="(item2, key) in item">
                                <dd :class="index == 'hot'?'iii':'bdb'"
                                    @click="_chooseOne(item2)">{{item2.regionName }}</dd>
                            </template>
                        </template>
                    </dl>
                </div>
            </div>
            <div class="widget-citys-letnav"
                 v-if="isShow"
                 @touchmove="_touchLetters">
                <ol>
                    <template v-for="(item, index) in letterList">
                        <li v-if="isNaN(index) && index=='hot'"
                            @click="_chooseLetter"
                            data-type="hotCity"><em class='hot-small'
                                                    data-type="hotCity"></em></li>
                        <li v-else
                            @click="_chooseLetter"
                            data-type="letter">{{index}}</li>
                    </template>
                </ol>
            </div>
        </div>
    </transition>
</template>


<script>
    import {
        Toast
    } from 'mint-ui';

    export default {
        name: "city-picker",
        props: {
            isShow: {
                type: Boolean,
                default: false,
                required: false
            },
            localCity: {
                type: String
            },
            /**
             * call back when click cancel button
             */
            close: {
                type: Function
            }
        },
        data () {
            return {
                targetLetter: '',
                letterList: {},
                defaultTrigger: true
            }
        },
        watch: {
            targetLetter: function () {
                this._scrollView();
            }
        },
        created () {
          this.getCurrentCity(); //获取当前城市
        },
        methods: {
            getCurrentCity () {
                let res='{"message":"操作成功！","status":"0000","data":{"hotCityList":[{"regionId":"1","code":"120000","regionName":"天津","parentId":"120000","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"11","regionName":"北京","parentId":"11","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"上海","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"深圳","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"广州","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"武汉","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"鞍山","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"安庆","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"},{"regionId":"1","code":"4","regionName":"安阳","parentId":"1","sortId":"1","shortName":"1","hotRegion":"1"}],' +
                    '"cityMap":{"A":[{"regionId":"1","code":"1","regionName":"鞍山","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"安庆","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"阿拉善盟","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"阿里地区","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"安康","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"B":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"C":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"D":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"E":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}],"F":[{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"},{"regionId":"1","code":"1","regionName":"北京","parentId":"1","sortId":"1","shortName":"BEIJING,北京市","hotRegion":"1"}]}}}'
              let that = this;
             /* this.$axiosHttp.http(
                { url: this.$httpConfig.cityListUrl },
                res => {*/
                  const { data } = JSON.parse(res)
                this.letterList = {hot:data.hotCityList,...data.cityMap}
              /*  }
              );*/
            },
            hide: function () {
                this.close && this.close()
            },
            /**
             * 点击字母
             */
            _chooseLetter: function (e) {
                let symbol = e.target.getAttribute('data-type')

                if (symbol == 'hotCity') {
                    this.targetLetter = '热门城市';
                } else {
                    this.targetLetter = e.target.innerText;
                }
            },
            /**
             * slide letters list
             */
            _touchLetters: function (e) {
                e.preventDefault();
                let ol = document.querySelector('.widget-citys-letnav ol'),
                    liNum = document.querySelectorAll('.widget-citys-letnav li').length,
                    olHei = ol.clientHeight, //ol height
                    liHei = Math.round(olHei / liNum), //li height
                    olTop = ol.offsetTop + ol.offsetParent.offsetTop,
                    olBot = olTop + olHei,
                    touchY = e.touches[0].pageY,
                    $wrapper = document.querySelector('.widget-citys')

                switch (e.type) {
                    case 'touchstart':
                        if (touchY < olTop) {
                            // 回顶
                            $wrapper.scrollTop = 0;
                        } else if (touchY > olBot) {
                            // 到底
                            $wrapper.scrollTop = 10000;
                        }
                        break;
                    case 'touchmove':
                        if (touchY < olBot && touchY > olTop) {
                            let olTouchY = touchY - olTop,
                                targetIndex = Math.ceil(olTouchY / liHei),
                                target = document.querySelectorAll('.widget-citys-letnav li')[targetIndex - 1]

                            if (target.getAttribute('data-type') == 'hotCity') {
                                this.targetLetter = '热门城市';
                            } else {
                                this.targetLetter = target.innerText;
                            }
                        } else if (touchY <= olTop) {
                            // 回顶
                            $wrapper.scrollTop = 0;
                        } else {
                            // 到底
                            $wrapper.scrollTop = 10000;
                        }
                        break;
                }
            },
            /**
             * 滚动可视区 - Triggered by '_chooseLetter'
             */
            _scrollView: function () {
                let dtList = document.querySelectorAll('.widget-citys-list dt'),
                    _this = this,
                    _dtList = Array.prototype.slice.call(dtList)

                if (_dtList) {
                    _dtList.forEach((value, index, array) => {
                        if (value.innerText === _this.targetLetter) {
                            let wrapper = document.querySelector('.widget-citys')
                            let scrollTop = document.querySelector('.widget-citys-list').offsetTop + value.offsetTop

                            wrapper.scrollTop = scrollTop

                            // setTimeout(function() {
                            //     // 解决ios下 元素滚动的bug  现象是触发scroll时会导致部分滚动元素消失到二次元
                            //     wrapper.style.width = (100 + (Math.round(Math.random() * 1000)) / 1000) + '%';
                            // }, 0);
                            return false;
                        }
                    })
                }
            },
            _chooseOne: function (obj) {
                this.$emit("onChoose", obj);
                console.log(obj)
            }
        }
    }
</script>
<style lang="less" scoped>
    /**
         * responsive font
         * lastmodify zhancheng
         * 由于UE目前都按375为1:2比例计算，所以默认370px为font-size:100px!important;
        **/
    html,
    body {
        -webkit-text-size-adjust: none !important;
    }
    @media screen and (min-width: 320px) {
        html {
            font-size: 84.375px !important;
        }
    }
    @media screen and (min-width: 330px) {
        html {
            font-size: 87.5px !important;
        }
    }
    @media screen and (min-width: 340px) {
        html {
            font-size: 90.625px !important;
        }
    }
    @media screen and (min-width: 350px) {
        html {
            font-size: 93.75px !important;
        }
    }
    @media screen and (min-width: 360px) {
        html {
            font-size: 96.875px !important;
        }
    }
    @media screen and (min-width: 370px) {
        html {
            font-size: 100px !important;
        }
    }
    @media screen and (min-width: 380px) {
        html {
            font-size: 103.125px !important;
        }
    }
    @media screen and (min-width: 390px) {
        html {
            font-size: 106.25px !important;
        }
    }
    @media screen and (min-width: 400px) {
        html {
            font-size: 109.375px !important;
        }
    }
    @media screen and (min-width: 410px) {
        html {
            font-size: 112.5px !important;
        }
    }
    @media screen and (min-width: 420px) {
        html {
            font-size: 115.625px !important;
        }
    }
    @media screen and (min-width: 430px) {
        html {
            font-size: 117.75px !important;
        }
    }
    @media screen and (min-width: 440px) {
        html {
            font-size: 120.875px !important;
        }
    }
    @media screen and (min-width: 450px) {
        html {
            font-size: 124px !important;
        }
    }
    @media screen and (min-width: 460px) {
        html {
            font-size: 127.125px !important;
        }
    }
    @media screen and (min-width: 470px) {
        html {
            font-size: 130.25px !important;
        }
    }
    @media screen and (min-width: 480px) {
        html {
            font-size: 133.375px !important;
        }
    }
    @media screen and (min-width: 490px) {
        html {
            font-size: 136.5px !important;
        }
    }
    @media screen and (min-width: 500px) {
        html {
            font-size: 139.625px !important;
        }
    }
    @media screen and (min-width: 639px) {
        html {
            font-size: 142.75px !important;
        }
    }
    @media screen and (min-width: 719px) {
        html {
            font-size: 145.875px !important;
        }
    }
    @media screen and (max-width: 319px) {
        html {
            font-size: 149px !important;
        }
    }
    body {
        font-size: 0.12rem;
    }
</style>
<style lang="less" scoped>
    * {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    html,
    body,
    div,
    span,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    abbr,
    address,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    samp,
    small,
    strong,
    sub,
    sup,
    var,
    b,
    i,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section,
    summary,
    time,
    mark,
    audio,
    video,
    button {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-size: 100%;
        vertical-align: baseline;
        list-style: none;
        font-weight: normal;
    }
    body {
        font-size: 0.12rem;
        font-family: -apple-system, "Helvetica Neue", Arial, "PingFang SC",
        "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei",
        "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN",
        "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC",
        "WenQuanYi Micro Hei", SimSun, sans-serif;
    }
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
        display: block;
    }
    nav ul {
        list-style: none;
    }
    blockquote,
    q {
        quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
        content: "";
        content: none;
    }
    a {
        margin: 0;
        padding: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
        text-decoration: none;
    }
    /* change colours to suit your needs */
    ins {
        background-color: #ff9;
        color: #000;
        text-decoration: none;
    }
    /* change colours to suit your needs */
    mark {
        background-color: #ff9;
        color: #000;
        font-style: italic;
        font-weight: bold;
    }
    del {
        text-decoration: line-through;
    }
    abbr[title],
    dfn[title] {
        border-bottom: 1px dotted;
        cursor: help;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    /* change border colour to suit your needs */
    hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #cccccc;
        margin: 1em 0;
        padding: 0;
    }
    select {
        vertical-align: middle;
    }
</style>
<style lang="less" scoped>
    * {
        font-weight: 400 !important;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .widget-citys {
        -webkit-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 10000;
        font-size: 0.28rem;
        color: #333;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        // padding: 0.1rem 0.1rem 0 0.1rem;
        // margin: 0.1rem 0.1rem 0 0.1rem;
        box-shadow: 0 0.01rem 0.06rem rgba(0, 0, 0, 0.2);
        .widget-citys-content {
            width: 100%;
            height: auto;
            background: #fff;
            box-shadow: 0 0.01rem 0.06rem rgba(0, 0, 0, 0.2);
            border-radius: 0.03rem;
            .widget-citys-header {
                height: 0.88rem;
                line-height: 0.88rem;
                display: -webkit-box;
                background: #fafafa;
                .iconfont {
                    font-size: 0.88rem;
                    font-weight: 1;
                    margin-left: 0.1rem;
                }
            }
            .widget-citys-local {
                height: 0.75rem;
                line-height: 0.75rem;
                text-indent: 0.25rem;
            }
            .widget-citys-list {
                position: relative;
                text-indent: 0.3rem;
                dl {
                    dt {
                        height: 0.65rem;
                        line-height: 0.6rem;
                        font-size: 0.3rem;
                        color: #878787;
                        background: #f0f0f0;
                        em {
                            position: relative;
                            top: 0.01rem;
                            margin-right: 0.06rem;
                        }
                    }
                    dd {
                        height: 0.75rem;
                        line-height: 0.75rem;
                        color: black;
                        text-indent: 0.25rem;
                    }
                }
            }
        }
        .widget-citys-searchlist {
            position: absolute;
            top: 0.4rem;
            width: 100%;
            bottom: 0;
            z-index: 10001;
            background: #fff;
            overflow: auto;
            li {
                margin: 0.11 0.16rem;
                height: 0.5rem;
                line-height: 0.5rem;
            }
            .nomatch {
                line-height: 0.5rem;
                text-align: center;
                font-size: 0.14rem;
                color: #aaa;
            }
        }
        /***** 1px border *****/
        .bdt,
        .bdb,
        .bdtb,
        .bdl,
        .bdr,
        .bdlr {
            position: relative;
        }
        .bdl:before,
        .bdr:after,
        .bdlr:before,
        .bdlr:after,
        .bdt:before,
        .bdb:after,
        .bdtb:before,
        .bdtb:after {
            background-size: 100% 100%;
            position: absolute;
            content: "";
            z-index: 10;
        }
        .bdl:before,
        .bdr:after,
        .bdlr:before,
        .bdlr:after {
            top: 0;
            width: 1px;
            height: 100%;
        }
        .bdt:before,
        .bdb:after,
        .bdtb:before,
        .bdtb:after {
            left: 0;
            height: 1px;
            width: 100%;
        }
        // 下边框
        .bdb:after {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0MwNUE4NEVENjJEMTFFNTk0MzA4M0I3N0Q3NjAwQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0MwNUE4NEZENjJEMTFFNTk0MzA4M0I3N0Q3NjAwQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQzA1QTg0Q0Q2MkQxMUU1OTQzMDgzQjc3RDc2MDBBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQzA1QTg0REQ2MkQxMUU1OTQzMDgzQjc3RDc2MDBBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsGoW24AAAAVSURBVHjaYvjw4QMDEwMDw3+AAAMAF5MD0jmBIYUAAAAASUVORK5CYII=");
            bottom: 0;
        }
        .iii {
            width: 1.4rem;
            height: .6rem;
            line-height: .6rem;
            overflow: hidden;
            border-radius: .08rem;
            background-color: #fafafa;
            margin: .13rem .13rem;
            display: inline-block;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
    }
    }
    .widget-citys-letnav {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 0.5rem;
        top: 0.48rem;
        padding-right: 0.26rem;
        z-index: 10002;
        display: -webkit-box;
        -webkit-box-align: center;
        section {
            -webkit-box-flex: 1;
        }
        ol {
            text-align: right;
            padding-bottom: 0.48rem;
            margin-top: -0.4rem;
            li {
                color: #666666;
                font-size: 0.3rem;
                width: 100%;
                height: 0.45rem;
                line-height: 0.45rem;
                box-sizing: border-box;
                text-align: center;
            }
        }
    }
    .citySlide-transition {
        transform: translateX(0) translateZ(0);
        -webkit-transform: translateX(0) translateZ(0);
    }
    .slide-enter,
    .slide-leave-active {
        transform: translateX(100%) translateZ(0);
        -webkit-transform: translateX(100%) translateZ(0);
    }
    .slide-enter,
    .slide-leave-active {
        transform: translateX(100%) !important;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    .exColor {
        color: #1e53ff;
    }
    .hot-big {
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.14rem;
        display: inline-block;
        background-size: cover;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NUIzQTM3OTdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NUIzQTM3QTdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1QjNBMzc3N0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1QjNBMzc4N0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ZnVAOAAAAZhJREFUeNpinDlzJgMZwBZKHyZVIwsDeaAGiP/Sy0JTIHaDso2B+CwpmpnI9B0MVJGqmVQL9YDYF4kfAMSatLSwGogZ0fRX0cpCDSAOwSIeAcRKtLCwCod6UMIrpbaFIB9E4pFPBGIpalgoCMR2QNxLIAuxQ9VYA7EAMfmQB4i1gFgXidYm1tVIcRkBZT8B4mtAfBmJvg7EX0AWdkLjgJGBekAGit2QxP4DcTcsWc9ioD2YAbKLCVomZgBxKw0tawLiLJBdTGhFViHU69QC/4A4D4jrcaXSCUAcD8R/qGDZLyCOBeLJhLLFYiAOBOLvFFj2FYj9gXgZsflwCxAHUWChFxDvIDXj/6bAwh/klDTmFFhoSY6FFhRYaDHoLVQBYlEKLFQAYglSLDTDY9hzIM6F4uekxiMpFr4B4nIgVgbiKVCsDBV7S2ywMhHhuo9A3AA1vAutQPgOFQNV0I1A/JkcCzmA2ACIv0GrLmWoYZ/wBN8nqKNAFndDHWKCrdLGZqEOEM+EWlSBI7hwAVCwl0H1LsDWhAQIMACcSkm+eKvWYQAAAABJRU5ErkJggg==");
    }
    .hot-small {
        width: 0.19rem;
        height: 0.19rem;
        display: inline-block;
        background-size: cover;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NUIzQTM3RDdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NUIzQTM3RTdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1QjNBMzdCN0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1QjNBMzdDN0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kvZSAAAAAWVJREFUeNpiTEtLYyAB2ELpw8RqYGEgDdQA8V9aWWAKxG5QtjEQnyVGExOJroeBKmI1EWuBHhD7IvEDgFiTmhZUAzEjmr4qalmgAcQhWMQjgFiRGhZU4lAHSiBlpKYiEF8FiHWAWBuKA/HoTwRiISC+AsTXoPRdIP6DbGAKEDsCsRYUs5GQstiBOAyKYeAnEF+HWrgf5PUjQGwNxAYkGo7PUgOomYdBFtyAFgHXGagHrkEtuAmLvMdQS05RwfATULOeoqeit0DsDMR7KDB8BxC7APE7XMn0CxB7A/FqMgxfBsT+QPyVUD74BcS1ZFhQCtVLVEYzJcMCc1JysgUZFlgMGgu4gFgfhyG/sIUzFJhgq8CwWWCMReE/IF4ErQM0oex/xDiMiUAE/wfiNdDCLx6I70ExiK0LlfuPL5iwWWAJpbdCvR2Koxi5BpUDOWgbKRZ8h5YjPkB8jojIPQvNnLbY4gcgwAAXbkHtR5mBDgAAAABJRU5ErkJggg==");
    }
</style>
