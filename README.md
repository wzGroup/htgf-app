# 恒天股份app-内嵌H5

从原地址迁移出来

打包命令：
npm run dev
npm run build 

抽取头部Header组件，展示基金名称的header自己页面写或者复制一份头部组件，自己修改。

写入cookie：
document.cookie = 'token=CD74FD3E5D95606533BEE84F460534B4; domain=' + window.location.hostname + '; path = /;'

