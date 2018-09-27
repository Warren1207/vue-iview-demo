<template>
  <div style="width:100%;">
      <Row>
        <Col :span="4" class="query-item">
          <Select v-model="queryForm.operatorId" filterable clearable placeholder="运营商" >
              <Option v-for="item in operatorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col :span="4" class="query-item">
          <Cascader :data="areaData" filterable v-model="queryForm.areaId" placeholder="地区" change-on-select></Cascader>
        </Col>
        <Col :span="4" class="query-item">
            <Select v-model="queryForm.subcontractorId" filterable clearable placeholder="分包商" >
                <Option v-for="item in subcontractorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Col>
        <Col :span="2" class="query-item">
            <Button type="primary" :style="{width: '100%', maxWidth: '120px', minWidth: '50px'}" @click="queryFn(true)">搜索</Button>
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
      <Modal v-model="planModal" :width="720" :title="modalTitle">
        <Form ref="planInfoFrom" :model="planinfo" :rules="planValidate" label-position="top">
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="运营商" prop="OperatorId">
                    <Select v-model="planinfo.OperatorId" :disabled="modalStatus==='modify' || userType===0 " filterable clearable placeholder="请选择运营商" >
                        <Option v-for="item in operatorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                  <FormItem label="区域" prop="AreaId">
                      <Cascader :data="areaData" filterable :disabled="modalStatus==='modify'  || userType===0" v-model="planinfo.AreaId" placeholder="请选择区域"></Cascader>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="分包商" prop="SubcontractorId" class="modal-form-item-padding">
                    <Select v-model="planinfo.SubcontractorId" :disabled="modalStatus==='modify'  || userType===0" filterable clearable placeholder="请选择分包商" >
                          <Option v-for="item in subcontractorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                  <FormItem label="计划单验站点数" prop="Counts">
                      <Input-number v-model="planinfo.Counts" :min="1" style="width: 100%"></Input-number>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="项目开始日期" prop="StartTime">
                    <Date-picker type="date" v-model="planinfo.StartTime" placeholder="选择项目开始日期" style="width: 100%"></Date-picker>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                  <FormItem label="项目截至日期" prop="EndTime">
                      <Date-picker type="date" v-model="planinfo.EndTime" placeholder="选择项目截至日期" style="width: 100%"></Date-picker>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="项目经理">
                    <Input v-model="planinfo.Manager" placeholder="请输入项目经理" clearable></Input>
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
import { formatDate } from '@/libs/utils'
export default {
  data () {
    return {
      planModal: false,
      modalTitle: '',
      modalStatus: '',
      queryForm: {},
      areaData: [],
      operatorData: [],
      subcontractorData: [],
      userType: '',
      columnTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '运营商',
          align: 'center',
          key: 'OperatorName'
        },
        {
          title: '地区',
          align: 'center',
          key: 'AreaName'
        },
        {
          title: '测试分包商',
          align: 'center',
          key: 'SubcontractorName'
        },
        {
          title: '计划单验站点数',
          align: 'center',
          key: 'Counts'
        },
        {
          title: '项目开始日期',
          align: 'center',
          key: 'StartTime',
          render: function (h, params) {
            return h('div',
              formatDate(new Date(params.row.StartTime), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '项目截至日期',
          align: 'center',
          key: 'EndTime',
          render: function (h, params) {
            return h('div',
              formatDate(new Date(params.row.EndTime), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '项目经理',
          align: 'center',
          key: 'Manager'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'UpdateTime',
          render: function (h, params) {
            return h('div',
              formatDate(new Date(params.row.UpdateTime), 'yyyy-MM-dd hh:mm'))
          }
        },
        {
          title: '操作',
          key: 'action',
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
      planinfo: {
        'Id': '',
        'OperatorId': '',
        'AreaId': [],
        'SubcontractorId': '',
        'Counts': 1,
        'StartTime': '',
        'EndTime': '',
        'Manager': ''
      },
      planValidate: {
        OperatorId: [{ type: 'number', required: true, message: '运营商不能为空', trigger: 'change' }],
        AreaId: [{ type: 'array', required: true, message: '区域不能为空', trigger: 'change' }],
        SubcontractorId: [{ type: 'number', required: true, message: '分包商不能为空', trigger: 'change' }],
        Counts: [{ type: 'number', required: true, message: '计划单验站点数不能为空', trigger: 'blur' }],
        StartTime: [{ type: 'date', required: true, message: '项目开始时间不能为空', trigger: 'change' }],
        EndTime: [{ type: 'date', required: true, message: '项目结束时间不能为空', trigger: 'change' }]
      },
      queryData: [],
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10
      }
    }
  },
  mounted: function () {
    this.initFn()
  },
  methods: {
    ...mapActions([
      'queryAreas',
      'operatorComboxList',
      'subcontractorComboxList',
      'queryPlan',
      'insertPlanInfo',
      'modifyPlanInfo',
      'deletePlanInfo'
    ]),
    initFn () {
      this.planinfoNew = JSON.parse(JSON.stringify(this.planinfo))
      this.queryFn(true)
      this.queryAreas().then(res => {
        this.areaData = res.Data
      })
      this.operatorComboxList().then(res => {
        this.operatorData = res.Data
      })
      this.subcontractorComboxList().then(res => {
        this.subcontractorData = res.Data
      })
    },
    addFn () {
      this.planModal = true
      this.modalTitle = '添加计划'
      this.modalStatus = 'insert'
      this.planinfo = JSON.parse(JSON.stringify(this.planinfoNew))
      this.userType = this.$store.state.user.UserType
      /** 普通用户需要带出地区、分包商、运营商 **/
      if (this.userType === 0) {
        this.planinfo.OperatorId = this.$store.state.user.OperatorId
        this.planinfo.SubcontractorId = this.$store.state.user.SubcontractorId
        this.planinfo.AreaId = this.$store.state.user.AreaId.split(',')
      }
    },
    modifyFn (index) {
      this.planinfo = JSON.parse(JSON.stringify(this.planinfoNew))
      this.modalTitle = '修改计划'
      this.modalStatus = 'modify'
      const row = JSON.parse(JSON.stringify(this.queryData[index]))
      if (row.AreaId) {
        row.AreaId = row.AreaId.split(',')
      }
      if (row.StartTime) {
        row.StartTime = new Date(row.StartTime)
      }
      if (row.EndTime) {
        row.EndTime = new Date(row.EndTime)
      }
      this.planinfo = row
      this.planModal = true
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
        content: '是否确定要删除选择的计划？',
        onOk: () => {
          this.deletePlanInfo({ Ids: ids.toString() }).then(res => {
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
    exportFn () {
      this.$Message.success('export!')
    },
    importFn () {
      this.$Message.success('import!')
    },
    saveFn () {
      this.$refs.planInfoFrom.validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.planinfo))
          data.AreaId = parseInt(data.AreaId[data.AreaId.length - 1])
          if (this.modalStatus === 'insert') {
            this.insertPlanInfo(data).then(res => {
              if (res.State === 0) {
                this.planModal = false
                this.$Message.success('保存成功!')
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          } else if (this.modalStatus === 'modify') {
            this.modifyPlanInfo(data).then(res => {
              if (res.State === 0) {
                this.planModal = false
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
      this.planModal = false
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
      this.queryPlan(params).then(res => {
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
