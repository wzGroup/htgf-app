// 文件涉及全局滚动模块， 如需修改，询问其他开发是否会造成影响
export default {
  data () {
    return {
      list: [],
      pageSize: 10,
      pageNum: 1,
      isInit: true
    }
  },
  mounted () {
    // if (!this.isDisabledFetch) {
    //   this.pullDown()
    // }
  },
  methods: {
    async pullDown () {
      this.pageNum = 1
      const res = await this.$http({
        method: this.$httpConfig.type,
        url: this.apiUrl,
        params: Object.assign({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }, this.params)
      })
      if (res.data.status == '0000') {
        this.list = res.data.data
        this.pageNum += 1
        this.$nextTick(() => {
          this.$refs.scroll.refresh(true)
          this.isInit = false
        })
      }
    },
    async pullUp () {
      const res = await this.$http({
        method: this.$httpConfig.type,
        url: this.apiUrl,
        params: Object.assign({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }, this.params)
      })
      if (res.data.status == '0000') {
        let newData = res.data.data
        this.list = [...this.list, ...newData]
        this.pageNum += 1
        this.$nextTick(() => {
          if (res.data.data) {
            this.$refs.scroll.refresh(res.data.data.length > 0)
          }
        })
      }
    }
  }
}
