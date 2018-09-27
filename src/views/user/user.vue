<template>
  <div style="width:100%;">
      <Row>
        <Col :span="4" class="query-item">
          <Input v-model="queryForm.username" placeholder="请输入用户名" clearable></Input>
        </Col>
        <Col :span="4" class="query-item">
          <Select v-model="queryForm.subcontractor" filterable clearable placeholder="分包商" >
              <Option v-for="item in subcontractorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col :span="4" class="query-item">
          <Select v-model="queryForm.operator" filterable clearable placeholder="运营商" >
              <Option v-for="item in operatorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col :span="4" class="query-item">
            <Cascader :data="areaData" v-model="queryForm.area" filterable placeholder="地区" change-on-select></Cascader>
        </Col>
        <Col :span="4" class="query-item">
            <Select v-model="queryForm.ftp" filterable placeholder="FTP" clearable>
                <Option v-for="item in ftpData" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Col>
        <Col :span="2" class="query-item">
            <Select v-model="queryForm.disabled" placeholder="状态" clearable>
                <Option value="0">已启用</Option>
                <Option value="1">已停用</Option>
            </Select>
        </Col>
        <Col :span="2" class="query-item">
            <Button type="primary" :style="{width: '100%', maxWidth: '120px', minWidth: '50px'}" @click="queryFn(true)">搜索</Button>
        </Col>
      </Row>
      <div class="tool-icon-group">
        <span @click="addFn"><Icon class="icon iconfont icon-xinzeng" size="20" title="新增"></Icon>新增</span>
      </div>
      <Table border ref="selection" :columns="columnTitle" :data="queryData" :stripe="true"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div :style="{textAlign:'center'}">
            <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" :current="pageInfo.current" @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer show-elevator show-total></Page>
        </div>
      </div>
      <Modal v-model="userModal" :width="720" :title="modalTitle">
        <Form ref="userInfoFrom" :model="userinfo" label-position="top">
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="用户名" prop="UserName" :rules="{ required: true, message: '账号不能为空', trigger: 'blur' }">
                    <Input type="text" :disabled="modalStatus==='modify'" v-model="userinfo.UserName" placeholder="用户名"></Input>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding" >
                  <FormItem label="密码" prop="PassWord" v-if="modalStatus==='insert'" :rules="{ required: true, message: '密码不能为空', trigger: 'blur' }">
                      <Input type="password" v-model="userinfo.PassWord" placeholder="密码"></Input>
                  </FormItem>
                  <FormItem label="用户类型" v-if="modalStatus==='modify'">
                       管理员<Checkbox :style="{marginLeft: '10px'}" :true-value="1" :false-value="0" @on-change="switchAdminFn" v-model="userinfo.UserType"></Checkbox>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="FTP" prop="FtpId" :rules="{ required: userinfo.UserType!==1, validator: validateFtp, type: 'number', message: 'FTP能为空', trigger: 'change' }">
                    <Select v-model="userinfo.FtpId" filterable clearable style="width:100%" placeholder="请选择FTP">
                      <Option v-for="item in ftpData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                  <FormItem label="分包商" prop="SubcontractorId" :rules="{ required: userinfo.UserType!==1, validator: validateSubcontractor, type: 'number', message: '分包商不能为空', trigger: 'change' }" >
                      <Select v-model="userinfo.SubcontractorId" filterable clearable placeholder="请选择分包商" >
                          <Option v-for="item in subcontractorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="运营商" prop="OperatorId" :rules="{ required: userinfo.UserType!==1, validator: validateOperator, type: 'number', message: '运营商不能为空', trigger: 'change' }">
                    <Select v-model="userinfo.OperatorId" filterable clearable placeholder="请选择运营商" >
                        <Option v-for="item in operatorData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                  <FormItem label="区域" prop="AreaId" :rules="{ required: userinfo.UserType!==1, validator: validateArea, message: '区域不能能为空', trigger: 'change' }">
                      <Cascader :data="areaData" filterable v-model="userinfo.AreaId" placeholder="请选择区域"></Cascader>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24" class="modal-form-item-padding">
                <FormItem label="" v-if="modalStatus==='insert'">
                    管理员<Checkbox :style="{marginLeft: '10px'}" :true-value="1" :false-value="0" @on-change="switchAdminFn" v-model="userinfo.UserType"></Checkbox>
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
      userModal: false,
      modalLoading: true,
      modalTitle: '',
      modalStatus: '',
      queryForm: {},
      ftpData: [],
      areaData: [],
      operatorData: [],
      subcontractorData: [],
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
          title: '用户名',
          align: 'center',
          key: 'UserName'
        },
        {
          title: '用户类型',
          align: 'center',
          key: 'UserType',
          render: (h, params) => {
            const userType = params.row.UserType === 1 ? '管理员' : '普通用户'
            return h('div', userType)
          }
        },
        {
          title: '分包商',
          align: 'center',
          key: 'Subcontractor'
        },
        {
          title: '运营商',
          align: 'center',
          key: 'Operator'
        },
        {
          title: '区域',
          align: 'center',
          key: 'Area'
        },
        {
          title: 'ftp',
          align: 'center',
          key: 'Ftp'
        },
        {
          title: '修改时间',
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
            let btnArray = []
            const editBtn = h('Button', {
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
            const disabledBtn = h('Button', {
              props: {
                type: 'warning',
                icon: 'icon iconfont icon-tingyong',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.disableFn(params.index)
                }
              }
            }, '停用')
            const enableBtn = h('Button', {
              props: {
                type: 'success',
                icon: 'icon iconfont icon-qiyong',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.enableFn(params.index)
                }
              }
            }, '启用')
            btnArray.push(editBtn)
            if (params.row.Disabled === 0) {
              btnArray.push(disabledBtn)
            } else {
              btnArray.push(enableBtn)
            }
            return h('div', btnArray)
          }
        }
      ],
      userinfo: {
        'UserId': '',
        'UserName': '',
        'PassWord': '',
        'FtpId': '',
        'SubcontractorId': '',
        'OperatorId': '',
        'AreaId': [],
        'UserType': '',
        'UpdateTime': '',
        'Token': '',
        'TokenExpiration': '',
        'Disabled': ''
      },
      queryData: [],
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      validateFtp: function (rule, value, callback) {
        if (rule.required === false) {
          callback()
        } else {
          if (value) {
            callback()
          } else {
            callback(rule.message)
          }
        }
      },
      validateSubcontractor: function (rule, value, callback) {
        if (rule.required === false) {
          callback()
        } else {
          if (value) {
            callback()
          } else {
            callback(rule.message)
          }
        }
      },
      validateOperator: function (rule, value, callback) {
        if (rule.required === false) {
          callback()
        } else {
          if (value) {
            callback()
          } else {
            callback(rule.message)
          }
        }
      },
      validateArea: function (rule, value, callback) {
        if (rule.required === false || value.length > 0) {
          callback()
        } else {
          callback(rule.message)
        }
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
      'ftpComboxList',
      'queryUserList',
      'insertUserInfo',
      'disableUserInfo',
      'enableUserInfo',
      'modifyUserInfo'
    ]),
    initFn () {
      this.userinfoNew = JSON.parse(JSON.stringify(this.userinfo))
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
      this.ftpComboxList().then(res => {
        this.ftpData = res.Data
      })
    },
    addFn () {
      this.userModal = true
      this.modalTitle = '添加用户'
      this.modalStatus = 'insert'
      this.userinfo = JSON.parse(JSON.stringify(this.userinfoNew))
    },
    modifyFn (index) {
      this.userinfo = JSON.parse(JSON.stringify(this.userinfoNew))
      this.modalStatus = 'modify'
      this.modalTitle = '编辑用户'
      const row = JSON.parse(JSON.stringify(this.queryData[index]))
      if (row.AreaArray) {
        row.AreaId = row.AreaArray.split(',')
      }
      this.userinfo = row
      this.userModal = true
    },
    disableFn (index) {
      const row = this.queryData[index]
      this.$Modal.confirm({
        title: '提示',
        content: '是否确定要停用此用户？',
        onOk: () => {
          this.disableUserInfo({ Ids: row.UserId }).then(res => {
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
    enableFn (index) {
      const row = this.queryData[index]
      this.$Modal.confirm({
        title: '提示',
        content: '是否确定要启用此用户？',
        onOk: () => {
          this.enableUserInfo({ Ids: row.UserId }).then(res => {
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
    importFn () {
      this.$Message.success('import!')
    },
    saveFn () {
      this.$refs.userInfoFrom.validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.userinfo))
          const leng = data.AreaId.length
          if (leng && leng > 0) {
            data.AreaId = parseInt(data.AreaId[leng - 1])
          }
          if (data.UserId) {
            this.modifyUserInfo(data).then(res => {
              if (res.State === 0) {
                this.$Message.success('更新成功!')
                this.userModal = false
                this.queryFn()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          } else {
            this.insertUserInfo(data).then(res => {
              if (res.State === 0) {
                this.$Message.success('保存成功!')
                this.userModal = false
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
      this.userModal = false
    },
    queryFn (isQuery) {
      let params = JSON.parse(JSON.stringify(this.queryForm))
      if (params.area && params.area.length > 0) {
        params.area = params.area[params.area.length - 1]
      }
      if (!params.disabled && params.disabled !== 0) {
        params.disabled = -1
      }
      if (isQuery) {
        this.pageInfo.current = 1
      }
      params.current = this.pageInfo.current
      params.pagesize = this.pageInfo.pageSize
      this.queryUserList(params).then(res => {
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
    },
    switchAdminFn (value) {
      const userInfoCopy = JSON.parse(JSON.stringify(this.userinfo))
      this.$refs.userInfoFrom.resetFields()
      this.userinfo = userInfoCopy
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
