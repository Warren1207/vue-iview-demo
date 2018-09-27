<template>
    <Row class="test_standard">
      <Col span="8">
        <div>
            <Tree :data="tree_data" ref="tree4" class="static" @on-select-change="cilck_event" :render="renderContent" v-model="testinfo.AreaId"></Tree>
        </div>
      </Col>
      <Col span="16">
        <Button type="primary" @click="new_add">新增</Button>
        <Table stripe border :columns="columns1" :data="data"></Table>
        <!-- 新增弹窗 -->
        <Modal v-model="testModal" :width="720" :title="modalTitle">
            <Form ref="testinfo" :model="testinfo" label-position="top">
                <Row :gutter="16">
                <Col span="12" class="modal-form-item-padding">
                    <FormItem label="网络制式" prop="MobileMode" :rules="{ required: true, message: '网络制式能为空', trigger: 'blur' }">
                        <Select v-model="testinfo.MobileMode" clearable placeholder="请选择网络制式">
                        <Option v-for="item in systemData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12" class="modal-form-item-padding">
                    <FormItem label="测试方式" prop="TestType" :rules="{ required: true, message: '测试方式不能为空', trigger: 'blur' }" >
                        <Select v-model="testinfo.TestType" clearable placeholder="请选择测试方式" >
                            <Option v-for="item in testModeData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="24" class="modal-form-item-padding">
                    <FormItem label="业务" prop="Business" :rules="{ required: true, message: '业务不能为空', trigger: 'blur' }" >
                        <Select v-model="testinfo.Business" multiple clearable placeholder="请选择业务" >
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
        <Modal v-model="amendModal" :width="720" :title="modalTitle">
            <Form ref="testinfo" :model="testinfo" label-position="top">
                <Row>
                    <Col span="24" class="modal-form-item-padding">
                        <FormItem label="业务" prop="Business" :rules="{ required: true, message: '业务不能为空' }" >
                            <Select v-model="testinfo.Business" multiple clearable placeholder="请选择业务" >
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
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
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
      active: false,
      testinfo: {
        MobileMode: '',
        TestType: '',
        Business: '',
        Id: '',
        AreaId: ''
      },
      modalTitle: '添加',
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
      'operatorComboxList',
      'subcontractorComboxList',
      'queryTest',
      'insertTestInfo',
      'deleteTestInfo',
      'modifyTestInfo'
    ]),
    initFn () {
      this.testinfo.AreaId = '110100'
      this.datas(true)
      this.queryAreass().then(res => {
        this.tree_data = res.Data
      })
    },
    renderContent (h, { root, node, data }) {
      if (node.children.length > 0) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto',
            borderRadius: '3px',
            padding: '3px 10px',
            margin: '5px 0',
            border: '1px solid #ddd',
            fontSize: '18px'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-folder-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ])
      } else {
        return h('span', {
          style: {
            border: '1px solid #ddd',
            borderRadius: '3px',
            padding: '2px 10px',
            margin: '10px 0',
            cursor: 'pointer',
            fontSize: '18px'
          },
          class: {
            active: true
          },
          on: {
            click: (e) => {
              let btns = this.$refs.tree4.$el.querySelectorAll('.active')
              for (let i = 0; i < btns.length; i++) {
                btns[i].style.backgroundColor = '#fff'
              }
              if (e.path[1].tagName === 'SPAN') {
                e.path[1].style.backgroundColor = '#2d8cf0'
              } else {
                e.path[0].style.backgroundColor = '#2d8cf0'
              }
              this.cilck_event(data)
            }
          }
        }, [
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ])
      }
    },
    cilck_event: function (data) {
      this.testinfo.AreaId = data.id
      this.datas()
    },
    datas: function (isQuery) {
      let params = JSON.parse(JSON.stringify(this.testinfo))
      this.queryTest(params).then(res => {
        this.data = res.Data
      })
    },
    new_add () {
      this.testModal = true
      this.testinfo.MobileMode = ''
      this.testinfo.TestType = ''
      this.testinfo.Business = ''
    },
    show (index) {
      this.testinfo.Id = index
      this.amendModal = true
      this.testinfo.Business = this.data[this.testinfo.Id].Business.split(',')
    },
    saveFn1 () {
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
    },
    cancleFn1 () {

    },
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
    cancleFn () {

    },
    saveFn () {
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
}
.test_standard>div:first-child{
    padding-right:20px;
}
.test_standard>div{
    height: 100%;
}
.test_standard>div>div{
    height: 100%;
    background:#fff;
    overflow: auto;
}
.ivu-tree ul{
    padding: 15px;
}
.ivu-tree ul li{
    margin: 0;
}
.static>.ivu-tree-children>li>ul:first-child{
    background : #2d8cf0
}
</style>
