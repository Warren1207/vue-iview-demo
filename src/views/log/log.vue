<template>
    <div style="width:100%">
      <Row>
          <Col span="4" class="query-item">
            <Input type="text" v-model="searchData.searchText" placeholder="GUID/文件名称" clearable></Input>
          </Col>
          <Col span="4" class="query-item">
            <DatePicker v-model="searchData.date" type="daterange" placeholder="日期" style="width: 100%"></DatePicker>
          </Col>
          <Col span="2" class="query-item">
            <Button type="primary" :style="{width: '100%', maxWidth: '120px', minWidth: '50px'}" @click="searchTable()">搜索</Button>
          </Col>
      </Row>
      <div class="tool-icon-group">
        <span @click="exportFn"><Icon class="icon iconfont icon-daochu" size="20" title="导出日志"></Icon>导出</span>
      </div>
      <Table border ref="table" :columns="columnTitle" :data="queryData" :stripe="true"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div :style="{textAlign:'center'}">
            <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" :current="pageInfo.current" @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer show-elevator show-total></Page>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { formatDate, formatSize } from '@/libs/utils'
export default {
  data () {
    return {
      searchData: { searchText: '', date: [] },
      columnTitle: [
        {
          title: 'GUID',
          width: 280,
          align: 'center',
          key: 'Guid'
        },
        {
          title: '文件名称',
          align: 'center',
          key: 'FileName'
        },
        {
          title: '文件全路径',
          width: 520,
          align: 'center',
          key: 'FileFullyName'
        },
        {
          title: '文件大小',
          align: 'center',
          key: 'Size',
          render: function (h, params) {
            return h(
              'div',
              formatSize(params.row.Size)
            )
          }
        },
        {
          title: '制式',
          align: 'center',
          key: 'MobileMode'
        },
        {
          title: '上传者',
          align: 'center',
          key: 'UserName'
        },
        {
          title: '上传时间',
          align: 'center',
          key: 'CreateTime',
          render: function (h, params) {
            return h(
              'div',
              formatDate(new Date(params.row.CreateTime), 'yyyy-MM-dd hh:mm')
            )
          }
        }
      ],
      queryData: [],
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      tableTotal: 1
    }
  },
  mounted: function () {
    this.queryTable()
  },
  methods: {
    ...mapActions(['queryLog']),
    queryTable () {
      let params = {}
      params.current = this.pageInfo.current
      params.pagesize = this.pageInfo.pageSize
      params.searchText = this.searchData.searchText || ''
      if (this.searchData.date && this.searchData.date[0]) {
        params.StartTime = formatDate(this.searchData.date[0], 'yyyy-MM-dd')
        params.EndTime = formatDate(this.searchData.date[1], 'yyyy-MM-dd')
      }
      this.queryLog(params).then(res => {
        this.queryData = res.Data
        this.pageInfo.total = res.Total
      })
    },
    searchTable () {
      this.pageInfo.current = 1
      this.queryTable()
    },
    changePage (page) {
      this.pageInfo.current = page
      this.queryTable()
    },
    pageSizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      this.queryTable()
    },
    exportFn () {
      this.$refs.table.exportCsv({
        filename: '上传记录日志'
      })
    }
  }
}
</script>
<style scoped>
.query-item{
  padding-right: 20px;
}
.tool-icon-group{
  padding-top: 20px;
  padding-bottom: 20px;
}
.tool-icon-group span{
  padding-right: 25px;
  color: #999999;
  cursor: pointer;
}
.tool-icon-group span:hover{
  color: #409eff;
}
</style>
