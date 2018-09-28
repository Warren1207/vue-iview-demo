<template>
    <Row class="test_standard">
      <Col span="8">
        <div>
            <Tree :data="tree_data" ref="tree4" class="static" @on-select-change="cilck_event" :render="renderContent" v-model="testinfo.AreaId"></Tree>
        </div>
      </Col>
      <Col span="16">
        <span @click="new_add"><Icon class="icon iconfont icon-xinzeng" size="20" title="新增"></Icon>新增</span>
        <Table stripe border :columns="columns1" :data="data"></Table>
        <!-- 新增弹窗 -->
        <Modal v-model="testModal" :width="720" :title="modalTitle" :mask-closable="false">
            <Form ref="testInfoFrom" :model="testinfo" label-position="top" :rules="testValidate">
                <Row :gutter="16">
                <Col span="12" class="modal-form-item-padding">
                    <FormItem label="网络制式" prop="MobileMode">
                        <Select v-model="testinfo.MobileMode" clearable placeholder="请选择网络制式" filterable>
                        <Option v-for="item in systemData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12" class="modal-form-item-padding">
                    <FormItem label="测试方式" prop="TestType" >
                        <Select v-model="testinfo.TestType" clearable placeholder="请选择测试方式" filterable>
                            <Option v-for="item in testModeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="24" class="modal-form-item-padding">
                    <FormItem label="业务" prop="Business">
                        <Select v-model="testinfo.Business" multiple clearable placeholder="请选择业务" filterable>
                            <Option v-for="item in businessData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancleFn">取消</Button>
                <Button type="primary" size="large" @click="saveFn">确定</Button>
            </div>
        </Modal>
        <!-- 编辑弹窗 -->
        <Modal v-model="amendModal" :width="720" :title="modalTitle1" :mask-closable="false">
            <Form ref="testFrom" :model="testinfo" label-position="top">
                <Row>
                    <Col span="24" class="modal-form-item-padding">
                        <FormItem label="业务" prop="Business" :rules="{type: 'array',required: true, message: '业务不能为空', trigger: 'change'}" >
                            <Select v-model="testinfo.Business" multiple clearable filterable placeholder="请选择业务" >
                                <Option v-for="item in businessData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancleFn1">取消</Button>
                <Button type="primary" size="large" @click="saveFn1">确定</Button>
            </div>
        </Modal>
      </Col>
    </Row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tree_data: [],
      columns1: [
        {
          title: '网络制式',
          key: 'MobileMode'
        },
        {
          title: '测试方式',
          key: 'TestType'
        },
        {
          title: '业务',
          key: 'Business'
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
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
                    this.show(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  icon: 'icon iconfont icon-bianji',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      data: [],
      testModal: false,
      amendModal: false,
      testinfo: {
        MobileMode: '',
        TestType: '',
        Business: '',
        Id: '',
        AreaId: ''
      },
      modalTitle: '添加',
      modalTitle1: '编辑',
      testValidate: {
        MobileMode: [{ required: true, message: '网络制式不能为空', trigger: 'change' }],
        TestType: [{ required: true, message: '测试方式不能为空', trigger: 'change' }],
        Business: [{ type: 'array', required: true, message: '业务不能为空', trigger: 'change' }]
      },
      systemData: [
        {
          value: 'NB',
          label: 'NB'
        },
        {
          value: 'LTE',
          label: 'LTE'
        },
        {
          value: 'WCDMA',
          label: 'WCDMA'
        },
        {
          value: 'GSM',
          label: 'GSM'
        },
        {
          value: 'CDMA1X',
          label: 'CDMA1X'
        },
        {
          value: 'CDMAEVDO',
          label: 'CDMAEVDO'
        },
        {
          value: 'TDSCDMA',
          label: 'TDSCDMA'
        }
      ],
      testModeData: [
        {
          value: 'DT',
          label: 'DT'
        },
        {
          value: 'CQT',
          label: 'CQT'
        }
      ],
      businessData: [
        {
          value: 'Idle',
          label: 'Idle'
        },
        {
          value: 'Ping',
          label: 'Ping'
        },
        {
          value: 'FTPUpLoad',
          label: 'FTPUpLoad'
        },
        {
          value: 'FTPDownLoad',
          label: 'FTPDownLoad'
        },
        {
          value: 'Volte',
          label: 'Volte'
        },
        {
          value: 'CSFB',
          label: 'CSFB'
        },
        {
          value: 'SRVCC',
          label: 'SRVCC'
        },
        {
          value: 'Video',
          label: 'Video'
        },
        {
          value: 'Voice',
          label: 'Voice'
        },
        {
          value: 'Attach',
          label: 'Attach'
        },
        {
          value: 'Detach',
          label: 'Detach'
        },
        {
          value: 'HttpUpload',
          label: 'HttpUpload'
        },
        {
          value: 'HttpDownload',
          label: 'HttpDownload'
        },
        {
          value: 'HTTPWebPage',
          label: 'HTTPWebPage'
        },
        {
          value: 'SMS',
          label: 'SMS'
        },
        {
          value: 'MOS',
          label: 'MOS'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'queryAreass',
      'queryTest',
      'insertTestInfo',
      'deleteTestInfo',
      'modifyTestInfo'
    ]),
    // 初始化
    initFn () {
      this.testinfo.AreaId = '110000'
      this.datas(true)
      this.queryAreass().then(res => {
        res.Data[0].expand = true
        this.tree_data = res.Data
        // this.tree_data[0].children[0].expand = true
      })
    },
    // 树渲染
    renderContent (h, { root, node, data }) {
      let style = {
        display: 'inline-block',
        width: 'auto',
        borderRadius: '3px',
        padding: '3px 10px',
        margin: '5px 0',
        border: '1px solid #ddd',
        fontSize: '18px',
        cursor: 'pointer'
      }
      let onclick = {
        click: (e) => {
          let btns = this.$refs.tree4.$el.querySelectorAll('.active')
          for (let i = 0; i < btns.length; i++) {
            btns[i].style.backgroundColor = '#fff'
          }
          if (e.path[1].tagName === 'SPAN') {
            if (e.path[1].className !== 'active') {
              e.path[2].style.backgroundColor = '#d5e8fc'
            } else {
              e.path[1].style.backgroundColor = '#d5e8fc'
            }
          } else if (e.path[0].tagName === 'SPAN') {
            e.path[0].style.backgroundColor = '#d5e8fc'
          }
          this.cilck_event(data)
        }
      }
      let types = 'ios-paper-outline'
      if (data.pid === '0') {
        style = {
          display: 'inline-block',
          width: 'auto',
          borderRadius: '3px',
          padding: '3px 10px',
          margin: '5px 0',
          border: '1px solid #ddd',
          fontSize: '18px',
          cursor: 'default'
        }
        types = 'ios-folder-outline'
        onclick = {
          click: (e) => {
            data.expand = true
          }
        }
      }
      if (data.children.length > 0) {
        types = 'ios-folder-outline'
      }
      return h('span', {
        style: style,
        class: 'active',
        on: onclick
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: types
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ])
      ])
    },
    // 树节点点击事件
    cilck_event: function (data) {
      // data.selected = !data.selected
      this.testinfo.AreaId = data.id
      this.datas()
    },
    // 表格数据查询
    datas: function (isQuery) {
      let params = JSON.parse(JSON.stringify(this.testinfo))
      this.queryTest(params).then(res => {
        this.data = res.Data
      })
    },
    // 新增
    new_add () {
      this.$refs.testInfoFrom.resetFields()
      this.testModal = true
    },
    // 表格编辑
    show (index) {
      this.testinfo.Id = index
      this.amendModal = true
      this.testinfo.Business = this.data[this.testinfo.Id].Business.split(',')
    },
    // 表格编辑保存
    saveFn1 () {
      this.$refs.testFrom.validate((valid) => {
        if (valid) {
          const rows = JSON.parse(JSON.stringify(this.data[this.testinfo.Id]))
          const row = JSON.parse(JSON.stringify(this.testinfo))
          row.Business = row.Business.toString()
          row.Id = rows.Id
          this.data[this.testinfo.Id] = row
          this.modifyTestInfo(this.data[this.testinfo.Id]).then(res => {
            if (res.State === 0) {
              this.amendModal = false
              this.$Message.success('更新成功!')
              this.datas()
            } else {
              this.$Message.error({ content: res.Message, duration: 3 })
            }
          })
        }
      })
    },

    cancleFn1 () {
      this.amendModal = false
    },
    // 表格删除
    remove (index) {
      const row = JSON.parse(JSON.stringify(this.data[index]))
      this.$Modal.confirm({
        title: '提示',
        content: '是否确定要删除选择的计划？',
        onOk: () => {
          this.deleteTestInfo({ Ids: row.Id }).then(res => {
            if (res.State === 0) {
              this.$Message.success('操作成功!')
              this.datas()
            } else {
              this.$Message.error({ content: res.Message, duration: 3 })
            }
          })
        }
      })
    },
    // 新增弹窗取消
    cancleFn () {
      this.testModal = false
    },
    // 新增保存
    saveFn () {
      this.$refs.testInfoFrom.validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.testinfo))
          data.Business = data.Business.toString()
          this.insertTestInfo(data).then(res => {
            if (res.State === 0) {
              this.testModal = false
              this.$Message.success('保存成功!')
              this.datas()
            } else {
              this.$Message.error({ content: res.Message, duration: 3 })
            }
          })
        }
      })
    }
  },
  mounted: function () {
    this.initFn()
  }
}
</script>
<style scoped>

</style>

<style>
.test_standard{
    height: 100%;
    width: 100%;
}
.test_standard>div:first-child{
    padding-right:20px;
}
.test_standard>div:last-child{
    padding-bottom: 40px;
}
.test_standard>div{
    height: 100%;
}
.test_standard>div>div{
    height: 100%;
    background:#fff;
    overflow: auto;
}
.test_standard>div:last-child>span{
    color: #999;
    cursor: pointer;
    margin: 0 0 20px;
    display: inline-block;
}
.test_standard>div:last-child>span:hover{
    color: #409eff;
}
.ivu-tree ul{
    padding: 15px 30px;
}
.ivu-tree ul li{
    margin: 0;
}
.ivu-tree-arrow i{
    font-size:20px;
    position: relative;
    left: -10px;
    top: -3px;
}
.active2{
    background : #d5e8fc
}
</style>
