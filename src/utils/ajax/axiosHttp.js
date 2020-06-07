
/**接口请求封装
 * @author huarunsong 2019-02-20
 * 参数说明
 * opt:
 * * ****name:具体业务请求名称
 * * ****method:默认POST
 * * ****url:接口路径
 * * ****params或data:具体业务请求参数
 * * ****needFailCallback:是否需要单独处理非0000状态的回调函数，true是需要，false默认不需要直接公用方法处理
 * * ****beforeSend:请求前
 * * ****complete:请求后
 */


import _axios from "./axios";

import commonJS from '../common.js'
import store from "../../store/store";
import { Toast } from 'mint-ui'
// import loading from '../loading'
// import tipAction from "@common/components/otherComponents/tipAction/tipAction"
var axiosHttp = {
    http(opt, callback, callbackFail, callbackNoData) {
            let opts = opt || {};
            let newParams = {};

            if (!opts.url) {
                console.error('缺少请求地址');
                return false;
            }

            if (opts.method === undefined) opts.method = 'POST';

            if (opts.loading=true && !opts.beforeSend) {
                opts.beforeSend = () => {
                    store.commit('showLoading')
                }
            }
           

            if (opts.loading && !opts.complete) {
                opts.complete = () => {
                    store.commit('hideLoading')
                }
            }

            if (opts.beforeSend) opts.beforeSend()

        
            return _axios({
                method: opts.method,
                url: opts.url,
                params: opts.params || {},
                data: opts.data ? JSON.stringify(opts.data) : {},
                //timeout: 15000,
            }).then(response => {
                
                if (opts.complete) opts.complete();

                //1. 接口成功的情况
                if(response.data.status == '0000'){
                    //原理上，接口成功，此时数据也不为空，否则后台应该传status为1000
                    // 为以防万一，先判断一下data是否为空
                    if(commonJS.dataIsEmpty(response.data.data )){ //说明data为空
                        callbackNoData && callbackNoData(response) 
                    }else{
                        callback && callback(response.data) 
                    }
                    
                }
                else if(response.data.status == '1000'){
                    //无数据，不用黑条提示，执行callbackNoData
                    callbackNoData && callbackNoData(response) 
                }
                else{
                    //接口不成功
                    let message = response.data.message ? response.data.message : '系统开小差啦，请联系系统管理员';

                    callbackFail ? callbackFail(response) : Toast(message);
                }

            }, response => {

                if (opts.complete) opts.complete();

                let message = response.data.message ? response.data.message : '系统开小差啦，请联系系统管理员';

                callbackFail ? callbackFail(response) : Toast(message);

                // console.error((opts.name || '') + "请求失败");

            }).catch(response => {

                if (opts.complete) opts.complete();
               
                console.error((opts.name || '') + "请求异常", response);
               
            });
        }
}

export default axiosHttp
