const magnifier = {
    data(){
        return {
            productDetailData: {}
        }
    },
    methods: {
        initData() {
            this.$http({
                method: this.$httpConfig.type,
                url: this.reqFormSearch,
                params: this.reqParams
            })
                .then(
                    response => {
                        if (response.data.status == "0000") {
                            this.$nextTick(() => {
                                if (response.data && response.data.data) {
                                    this.productDetailData = response.data.data;
                                }
                            })
                            
                        } else if (response.data.status == "1000") {
                            this.productDetailData = [];
                            this.$commonJS.alertI("提示", "请求数据为空！");
                        } else {
                            this.$commonJS.alertI(
                                "提示",
                                response.data.message
                            );
                        }
                    },
                    response => {
                        this.$commonJS.alertI(
                            "提示",
                            '获取单个产品详情失败'
                        );
                    }
                )
                .catch(response=> {
                    this.$commonJS.alertI(
                        "提示",
                        '获取单个产品详情异常'
                    );
                });
        },
        gotoAppPage(type,projectId,projectName){
            window.jsObj.gotoPagetypeProserialnoFundname(type,projectId,projectName)
        },
        goToDetail(){
            let obj={
                projectId: this.productDetailData.projectId,
                url: 'productDetail?projectId=' + this.productDetailData.projectId
            }
            window.jsObj.goToProductDetail(JSON.stringify(obj))
        }
    }
    
}
export default magnifier;