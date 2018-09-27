<template>
    <div style="width:100%">
      <Row>
        <Col :span="4" class="query-item">
          <Input type="text" v-model="queryForm.name" placeholder="名称" clearable></Input>
        </Col>
        <Col :span="2" class="query-item">
            <Button type="primary" :style="{width: '100%', maxWidth: '120px', minWidth: '50px'}" @click="queryFn('queryForm')">搜索</Button>
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
      <Modal v-model="subcModal" :width="720" :title="modalTitle">
          <Form ref="subcFrom" :model="subcInfo" :rules="subcValidate" label-position="top">
              <Row>
                <Col span="12" class="modal-form-item-padding">
                  <FormItem label="名称" prop="Name">
                      <Input v-model="subcInfo.Name" clearable placeholder="名称" ></Input>
                  </FormItem>
                </Col>
                <Col span="12" class="modal-form-item-padding">
                    <FormItem label="编号" prop="Code">
                        <Input v-model="subcInfo.Code" clearable placeholder="编号" ></Input>
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
      subcModal: false,
      modalTitle: '',
      modalStatus: '',
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
          title: '分包商名称',
          align: 'center',
          key: 'Name'
        },
        {
          title: '分包商编码',
          align: 'center',
          key: 'Code'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
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
      subcInfo: {
        Id: '',
        Name: '',
        Code: ''
      },
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      subcValidate: {
        Name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        Code: [{ required: true, message: '编号不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted: function () {
    this.initFn()
  },
  methods: {
    ...mapActions([
      'querySubcontractorList',
      'insertSubcInfo',
      'modifySubcInfo',
      'deleteSubcInfo'
    ]),
    initFn () {
      this.subcInfoNew = JSON.parse(JSON.stringify(this.subcInfo))
      this.queryFn(true)
    },
    addFn () {
      this.subcModal = true
      this.modalTitle = '添加分包商'
      this.modalStatus = 'insert'
      this.subcInfo = JSON.parse(JSON.stringify(this.subcInfoNew))
    },
    modifyFn (index) {
      this.subcModal = true
      this.modalTitle = '修改分包商'
      this.modalStatus = 'modify'
      this.subcInfo = JSON.parse(JSON.stringify(this.subcInfoNew))
      const row = JSON.parse(JSON.stringify(this.queryData[index]))
      this.subcInfo = row
      this.subcModal = true
    },
    delFn () {
      const rows = this.$refs.selection.getSelection()
      let ids = []
      if (rows.length === 0) {
        this.$Message.success('请选择要删除的数据!')
        return false
      }
      for (let i = 0; i < rows.length; i++) {
        ids.push(rows[i].Id)
      }
      this.$Modal.confirm({
        title: '提示',
        content: '是否确定要删除选择的分包商？',
        onOk: () => {
          this.deleteSubcInfo({ Ids: ids.toString() }).then(res => {
            if (res.State === 0) {
              this.$Message.success('操作成功!')
              this.queryFn()
            } else {
              this.$Message.error({ content: res.Message, duration: 3 })
            }
          })
        }
      })
    },
    saveFn () {
      this.$refs.subcFrom.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.subcInfo))
          if (this.modalStatus === 'insert') {
            this.insertSubcInfo(data).then(res => {
              if (res.State === 0) {
                this.subcModal = false
                this.$Message.success('保存成功!')
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          } else if (this.modalStatus === 'modify') {
            this.modifySubcInfo(data).then(res => {
              if (res.State === 0) {
                this.subcModal = false
                this.$Message.success('更新成功!')
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          }
        }
      })
    },
    cancleFn () {
      this.subcModal = false
    },
    queryFn (isQuery) {
      let params = JSON.parse(JSON.stringify(this.queryForm))
      if (params.areaId && params.areaId.length > 0) {
        params.areaId = params.areaId[params.areaId.length - 1]
      }
      if (isQuery) {
        this.pageInfo.current = 1
      }
      params.current = this.pageInfo.current
      params.pagesize = this.pageInfo.pageSize
      this.querySubcontractorList(params).then(res => {
        this.queryData = res.Data
        this.pageInfo.total = res.Total
      })
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
.modal-form-item-padding {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
