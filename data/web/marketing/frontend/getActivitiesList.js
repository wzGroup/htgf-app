/*

  项目详情-获取详情数据

*/

// 使用 Mock
var Mock = require('mockjs');

var mymessage = Mock.mock({
	"data":{
		"activityVoPageInfo":{
			"endRow":1,
			"firstPage":0,
			"hasNextPage":false,
			"hasPreviousPage":false,
			"isFirstPage":true,
			"isLastPage":true,
			"lastPage":0,
			"list":[
				{
					"accreditedInvestor":0,
					"actAuditReason":"",
					"actCity":"",
					"actCityNO":"",
					"actEndDate":1585734840000,
					"actForm":1,
					"actId":11753,
					"actImgUrl":"",
					"actName":"非企金活动003_20190801",
					"actPlayEndTime":null,
					"actPlayStartTim":null,
					"actPlayTimeMark":"",
					"actProvince":"",
					"actProvinceNO":"",
					"actStartDate":1583142840000,
					"actType":1,
					"id":10003,
					"isPlayback":null,
					"prize":"",
					"prizeFlag":false,
					"realAuth":0,
					"riskAppraisal":0,
					"transStatus":0
				}
			],
			"navigateFirstPage":0,
			"navigateLastPage":0,
			"navigatePages":8,
			"navigatepageNums":[1],
			"nextPage":0,
			"pageNum":1,
			"pageSize":10,
			"pages":1,
			"prePage":0,
			"size":1,
			"startRow":1,
			"total":1
		},
		"defaultRecommend":null
	},
	"message":"操作成功！",
	"status":"0000"
});
module.exports = mymessage;