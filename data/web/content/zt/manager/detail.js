// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
	"data": {
		"foundTime": "2020-05-27",
		"managerScale": "10-10",
		"createTime": "2020-05-27 09:54:38",
		"digest": "摘要",
		"description": "描述",
		"fornums": null,
		"updateTime": "2020-06-01 14:16:52",
		"id": 24,
		"managerName": "哈哈2",
		"strategy": "12222222",
		"recordNum": "1212122",
		"logos": [{
			"oldUrl": "http://123",
			"id": 1032,
			"managerId": null,
			"type": null,
			"url": "http:/1234555",
			"ratio": 0
		}]
	},
	"message": "操作成功！",
	"status": "0000"
});
module.exports = data;