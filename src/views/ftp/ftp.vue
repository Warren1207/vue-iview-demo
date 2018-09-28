<template>
    <div style="width:100%;height:100%;" ref="maxContainer">
      <Row ref="queryContainer">
          <Col span="4"  class="query-item">
            <Input type="text" v-model="searchData.searchText" placeholder="服务器名称/IP" clearable></Input>
          </Col>
          <Col span="2"  class="query-item">
            <Button type="primary" :style="{width: '100%', maxWidth: '120px', minWidth: '50px'}" @click="searchTable()">搜索</Button>
          </Col>
      </Row>
      <div class="tool-icon-group" ref="iconContainer">
        <span @click="addFn"><Icon class="icon iconfont icon-xinzeng"  size="20" title="新增"></Icon>新增</span>
        <span @click="delFn"><Icon class="icon iconfont icon-shanchu" size="20" title="删除"></Icon>删除</span>
      </div>
      <Table border ref="selection" :columns="columnTitle" :data="queryData" :height="tableH" :stripe="true"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div :style="{textAlign:'center'}">
            <Page :total="pageInfo.total" :page-size="pageInfo.pageSize" :current="pageInfo.current" @on-change="changePage" @on-page-size-change="pageSizeChange" show-sizer show-elevator show-total></Page>
        </div>
      </div>
      <Modal v-model="ftpModal" :width="720" :title="modalTitle" :mask-closable="false">
        <Form ref="ftpInfoFrom" :model="ftpinfo" label-position="top">
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="服务器名称" prop="Name" :rules="{ required: true, message: '服务器名称不能为空',trigger: 'blur' }">
                    <Input type="text" v-model="ftpinfo.Name" placeholder="服务器名称"></Input>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding" >
                  <FormItem label="服务器IP" prop="IP" :rules="{ required: true, validator: validateFtpIP,  trigger: 'blur' }">
                      <Input type="text" v-model="ftpinfo.IP" placeholder="127.0.0.1"></Input>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="端口号" prop="Port" :rules="{ required: true, message: '端口号不能为空',trigger: 'blur' }">
                      <Input type="text" v-model="ftpinfo.Port" placeholder="8080"></Input>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="根目录" prop="RemotePath">
                      <Input type="text" v-model="ftpinfo.RemotePath" placeholder="根目录"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="用户名" prop="FtpUserName" :rules="{ required: true, message: '用户名不能为空',trigger: 'blur' }">
                      <Input type="text" v-model="ftpinfo.FtpUserName" placeholder="用户名"></Input>
                </FormItem>
              </Col>
              <Col span="12" class="modal-form-item-padding">
                <FormItem label="密码" prop="FtpPassWord" :rules="{ required: true, message: '用户密码不能为空',trigger: 'blur' }">
                      <Input type="text" v-model="ftpinfo.FtpPassWord" placeholder="密码"></Input>
                </FormItem>
              </Col>
            </Row>
        </Form>
        <div slot="footer">
            <Button type="text" size="large" @click="cancleFn">取消</Button>
            <Button type="primary" size="large" :loading='testLoading' @click="pingFn">测试连接</Button>
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
      searchData: { searchText: '', state: -1 },
      columnTitle: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '服务器名称',
          width: 280,
          align: 'center',
          key: 'Name'
        },
        {
          title: 'IP',
          align: 'center',
          key: 'IP'
        },
        {
          title: '端口号',
          align: 'center',
          key: 'Port'
        },
        {
          title: '用户名',
          align: 'center',
          key: 'FtpUserName'
        },
        {
          title: '密码',
          align: 'center',
          key: 'FtpPassWord'
        },
        {
          title: '远程路径',
          align: 'center',
          key: 'RemotePath'
        },
        {
          title: '更新时间',
          align: 'center',
          key: 'UpdateTime',
          render: function (h, params) {
            return h(
              'div',
              formatDate(new Date(params.row.UpdateTime), 'yyyy-MM-dd hh:mm')
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let btnArray = []
            const editBtn = h(
              'Button',
              {
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
                    this.editFn(params.index)
                  }
                }
              },
              '编辑'
            )
            const disabledBtn = h(
              'Button',
              {
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
                    this.ftpStateFn(params.index)
                  }
                }
              },
              '停用'
            )
            const enableBtn = h(
              'Button',
              {
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
                    this.ftpStateFn(params.index)
                  }
                }
              },
              '启用'
            )
            btnArray.push(editBtn)
            if (params.row.State === 1) {
              btnArray.push(disabledBtn)
            } else {
              btnArray.push(enableBtn)
            }
            return h('div', btnArray)
          }
        }
      ],
      queryData: [],
      pageInfo: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      tableTotal: 1,
      ftpModal: false,
      modalTitle: '新增服务器',
      ftpinfo: {},
      testLoading: false,
      validateFtpIP: function (rule, value, callback) {
        if (!value) {
          callback(new Error('IP地址不能为空!'))
        } else if (/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(value)) {
          callback()
        } else {
          callback(new Error('IP地址格式错误!'))
        }
      },
      tableH: 0
    }
  },
  mounted: function () {
    this.queryTable()
    const that = this
    window.onresize = () => {
      that.tableHeight()
    }
  },
  methods: {
    ...mapActions(['queryFtpList', 'ftpState', 'ftpDel', 'ftpModify', 'ftpAdd', 'ftpCheck']),
    tableHeight () {
      if (this.$refs.maxContainer) {
        this.outsiderH = this.$refs.maxContainer.offsetHeight
        this.queryH = this.$refs.queryContainer.$el.offsetHeight
        this.iconH = this.$refs.iconContainer.offsetHeight
        this.tableH = this.outsiderH - this.queryH - this.iconH - 50
      }
    },
    queryTable () {
      let params = {}
      params.current = this.pageInfo.current
      params.pagesize = this.pageInfo.pageSize
      params.searchText = this.searchData.searchText || ''
      params.state = this.searchData.state
      this.queryFtpList(params).then(res => {
        this.queryData = res.Data
        this.pageInfo.total = res.Total
        this.tableHeight()
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
    addFn () {
      this.ftpModal = true
      this.modalTitle = '添加服务器'
      this.$refs.ftpInfoFrom.resetFields()
    },
    editFn (index) {
      this.modalTitle = '编辑服务器'
      const row = JSON.parse(JSON.stringify(this.queryData[index]))
      this.ftpinfo = row
      this.ftpModal = true
    },
    delFn () {
      this.$Modal.confirm({
        title: '确认删除',
        content: '<p>删除后该服务器将从系统移除</p>',
        onOk: () => {
          let ids = []
          this.$refs.selection.getSelection().forEach(element => {
            ids.push(element.Id)
          })
          this.ftpDel({ ids: ids.join(',') }).then(
            res => {
              if (res.State === 0) {
                this.$Message.success('操作成功！')
                this.queryTable()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            }
          )
        }
      })
    },
    ftpStateFn (index) {
      const data = this.queryData[index]
      this.$Modal.confirm({
        title: data.State === 0 ? '确认启用' : '确认停用',
        content: data.State === 0 ? '<p>启用后该服务器将可以被使用</p>' : '<p>停用后改服务器将无法被使用</p>',
        onOk: () => {
          this.ftpState({ id: data.Id, state: data.State === 1 ? 0 : 1 }).then(
            res => {
              if (res.State === 0) {
                this.$Message.success('操作成功！')
                this.queryTable()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            }
          )
        }
      })
    },
    cancleFn () {
      this.ftpModal = false
    },
    pingFn () {
      this.$refs.ftpInfoFrom.validate((valid) => {
        if (valid) {
          this.testLoading = true
          let data = JSON.parse(JSON.stringify(this.ftpinfo))
          this.ftpCheck(data).then(res => {
            if (res.State === 0) {
              this.$Message.success('连接成功!')
            } else {
              this.$Message.error({ content: res.Message, duration: 3 })
            }
            this.testLoading = false
          })
        }
      })
    },
    saveFn () {
      this.$refs.ftpInfoFrom.validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ftpinfo))
          if (data.Id) {
            this.ftpModify(data).then(res => {
              if (res.State === 0) {
                this.$Message.success('更新成功!')
                this.ftpModal = false
                this.queryTable()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          } else {
            this.ftpAdd(data).then(res => {
              if (res.State === 0) {
                this.$Message.success('保存成功!')
                this.ftpModal = false
                this.queryTable()
              } else {
                this.$Message.error({ content: res.Message, duration: 3 })
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.query-item {
  padding-right: 20px;
}
.tool-icon-group {
  padding-top: 20px;
  padding-bottom: 20px;
}
.tool-icon-group span {
  padding-right: 25px;
  color: #999999;
  cursor: pointer;
}
.tool-icon-group span:hover {
  color: #409eff;
}
.modal-form-item-padding {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
