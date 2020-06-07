import axios from "axios";
import router from "../../router";
import { Toast } from 'mint-ui'
// import tipAction from '../../components/otherComponents/tipAction/tipAction';

let instance = axios.create({
    
  });
instance.interceptors.request.use((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    return config
  })
instance.interceptors.response.use(data => {
    var status=data.data.status;
    if(status=='4007'){//登录失效
      // 跳转到临时登录页，原生通过拦截地址跳转到原生的登录(/login)
      router.replace({
        path:'login',
        query:{redirect:router.currentRoute.fullPath}
      })
    }
    else
    {
      return data;
    }
  
  }, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
  
        case 401:
          err.message = '未授权，请登录'
          break
  
        case 403:
          err.message = '拒绝访问'
          break
  
        case 404:
          err.message = `请求地址出错`
          break
  
        case 408:
          err.message = '请求超时'
          break
  
        case 500:
          err.message = '服务器内部错误'
          break
  
        case 501:
          err.message = '服务未实现'
          break
  
        case 502:
          err.message = '网关错误'
          break
  
        case 503:
          err.message = '服务不可用'
          break
  
        case 504:
          err.message = '网关超时'
          break
  
        case 505:
          err.message = 'HTTP版本不受支持'
          break
  
        default:
      }
    }
    if(err.config.url != "/api/wxJs/getJsticket"){
      Toast(
        err.message
      );
      this_$loading.open()
      
    }else if(err.message != 500 && err.config.url == "/api/wxJs/getJsticket"){
      Toast(
        err.message
      );
    }
    return Promise.reject(err);
    })
    export default instance;