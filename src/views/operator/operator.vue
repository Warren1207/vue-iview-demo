<template>
    <div style="width:100%">
      <Row>
        <Col :span="4" class="query-item">
          <Input type="text" v-model="queryForm.name" placeholder="名称" clearable></Input>
        </Col>
        <Col :span="2" class="query-item">
            <Button type="primary" :style="{width: '100%', maxWidth: '120px', minWidth: '50px'}" @click="searchTable()">搜索</Button>
        </Col>
      </Row>
      <div class="tool-icon-group">
        <span @click="addFn"><Icon class="icon iconfont icon-xinzeng" size="20" title="新增"></Icon>新增</span>
        <span @click="delFn"><Icon class="icon iconfont icon-shanchu" size="20" title="删除"></Icon>删除</span>
      </div>
      <Table border ref="selection" :columns="columnTitle" :data="queryData" :stripe="true"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div :style="{textAlign:'center'}">
            <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" :current="pageInfo.current" @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer show-elevator show-total></Page>
        </div>
      </div>
      <Modal v-model="operatorModal" :width="360" :title="modalTitle">
        <Form ref="operatorFrom" :model="operatorinfo" label-position="top">
            <Row>
              <Col span="24" class="modal-form-item-padding">
                <FormItem label="运营商名称" prop="Name" :rules="{ required: true, message: '运营商名称不能为空',trigger: 'blur' }">
                    <Input type="text" v-model="operatorinfo.Name" placeholder="运营商名称"></Input>
                </FormItem>
              </Col>
            </Row>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="cancleFn">取消</Button>
            <Button type="primary" size="large" @click="saveFn">确定</Button>
        </div>
      </Modal>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      queryForm: {},
      columnTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          width: 80,
          title: '序号',
          align: 'center'
        },
        {
          title: '名称',
          align: 'center',
          key: 'Name'
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                icon: 'icon iconfont icon-bianji',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.modifyFn(params.index)
                }
              }
            }, '编辑')
          }
        }
      ],
      queryData: [],
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      modalTitle: '',
      operatorinfo: {},
      operatorModal: false
    }
  },
  mounted: function () {
    this.queryFn()
  },
  methods: {
    ...mapActions([
      'queryOperatorList', 'operatorModify', 'operatorAdd', 'operatorDel'
    ]),
    addFn () {
      this.operatorModal = true
      this.modalTitle = '添加运营商'
      this.$refs.operatorFrom.resetFields()
    },
    modifyFn (index) {
      this.modalTitle = '编辑运营商'
      const row = JSON.parse(JSON.stringify(this.queryData[index]))
      this.operatorinfo = row
      this.operatorModal = true
    },
    delFn () {
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>删除后该运营商将从系统移除</p>',
        onOk: () => {
          let ids = []
          this.$refs.selection.getSelection().forEach(element => {
            ids.push(element.Id)
          })
          const data = { ids: ids.join(',') }
          this.operatorDel(data).then(
            res => {
              if (res.State === 0) {
                this.$Message.success('操作成功！')
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            }
          )
        }
      })
    },
    cancleFn () {
      this.operatorModal = false
    },
    saveFn () {
      this.$refs.operatorFrom.validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.operatorinfo))
          if (data.Id) {
            this.operatorModify(data).then(res => {
              if (res.State === 0) {
                this.$Message.success('更新成功!')
                this.operatorModal = false
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          } else {
            this.operatorAdd(data).then(res => {
              if (res.State === 0) {
                this.$Message.success('保存成功!')
                this.operatorModal = false
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          }
        }
      })
    },
    queryFn () {
      let params = {}
      params = JSON.parse(JSON.stringify(this.queryForm))
      params.current = this.pageInfo.current
      params.pagesize = this.pageInfo.pageSize
      this.queryOperatorList(params).then(res => {
        this.queryData = res.Data
        this.pageInfo.total = res.Total
      })
    },
    searchTable () {
      this.pageInfo.current = 1
      this.queryFn()
    },
    changePage (page) {
      this.pageInfo.current = page
      this.queryFn()
    },
    pageSizeChange (pageSize) {
      this.pageInfo.pageSize = pageSize
      this.queryFn()
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
