/*

  项目详情-获取详情数据

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
	"data":{
		"cityName":"",
		"cityCode":"",
		"provinceCode":"",
		"provinceName":""
	},
	"message":"操作成功！",
	"status":"0000"
});
module.exports = mymessage;