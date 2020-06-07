/**
 * 路由和evtList对应表
 * 每条evtid都以 task_management_ 开始，表示是属于任务管理的
 */
var mdPathList = {

	"/" : { evtid: 'task_management_index', topic: '任务管理-首页', info: ''} ,
	"/ManagementDetail" : { evtid: 'task_management_managementDetail', topic: '任务管理-任务详情', info: ''} ,
	"/SendScope": { evtid: 'task_management_sendScope', topic: '任务管理-发送范围', info: '' },
	"/FinishedCondition": { evtid: 'task_management_finishedCondition', topic: '任务管理-完成情况', info: '' },
	"/membershipDetails": { evtid: 'member_membership_detail', topic: '会员权益-会员权益详情页', info: '' },
	"/informationDetail": { evtid: 'htgf_app_information_detail', topic: '资讯-资讯详情页', info: '' },
	"/articlePage": { evtid: 'member_article_page', topic: '会员权益-规则说明', info: '' },
	"/videoDoctor": { evtid: 'videoDoctor', topic: '视频医生', info: ''}
}

module.exports = mdPathList;