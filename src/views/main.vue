<template>
    <div class="layout">
        <Layout style="width:100%">
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1"  @on-select="logout">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="icon iconfont icon-qunzu" size="24" />
                                {{userName}}
                            </template>
                            <MenuItem name="logout">退出登录</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#333333'}">
                    <Menu active-name="home" theme="dark" width="auto" @on-select="goTodo">
                        <MenuItem v-for="item in MenuData" :key="item.name" :name="item.name">
                            <Icon :class="item.icon" size="25"></Icon>
                            <span>{{item.text}}</span>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '20px 20px 0px 20px'}">
                    <Content :style="{minHeight: '280px', paddingBottom: '70px',height:'100%'}">
                        <router-view></router-view>
                    </Content>
                    <div class="layout-copy" :style="{textAlign: 'center', lineHeight: '50px'}">
                        &copy; Copyright 2009-2018 全球质量监控系统
                    </div>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Main',
  components: {},
  data () {
    return {}
  },
  computed: {
    userName: function () {
      return this.$store.state.user.UserName
    },
    MenuData: function () {
      let menuList = []
      if (this.$store.state.user.UserType === 0) {
        menuList = [
          {
            name: 'plan',
            text: '计划管理',
            icon: 'icon iconfont icon-jihuaguanli'
          }
        ]
      } else if (this.$store.state.user.UserType === 1) {
        menuList = [
          { name: 'home', text: '主页', icon: 'icon iconfont icon-zhuye' },
          {
            name: 'plan',
            text: '计划管理',
            icon: 'icon iconfont icon-jihuaguanli'
          },
          {
            name: 'test',
            text: '测试标准管理',
            icon: 'icon iconfont icon-ceshibiaozhunguanli'
          },
          {
            name: 'user',
            text: '用户管理',
            icon: 'icon iconfont icon-yonghuguanli'
          },
          {
            name: 'ftp',
            text: '服务器管理',
            icon: 'icon iconfont icon-fuwuqiguanli'
          },
          {
            name: 'subcontractor',
            text: '分包商管理',
            icon: 'icon iconfont icon-fenbaoshangguanli'
          },
          {
            name: 'operator',
            text: '运营商管理',
            icon: 'icon iconfont icon-yunyingshangguanli'
          },
          {
            name: 'log',
            text: '上传日志管理',
            icon: 'icon iconfont icon-rizhiguanli'
          }
        ]
      }
      return menuList
    }
  },
  methods: {
    ...mapActions([
      'handleLogout'
    ]),
    goTodo (name) {
      this.$router.push({
        name: name
      })
    },
    logout (name) {
      if (name === 'logout') {
        this.handleLogout().then(res => {
          this.$router.push({
            name: 'login'
          })
        })
      }
    }
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-header {
  background-color: #333333 !important;
}
.ivu-menu-dark {
  background-color: #333333 !important;
}
.layout-logo {
  width: 178px;
  height: 47px;
  background: url("../assets/logo.png");
  border-radius: 3px;
  float: left;
  position: relative;
  top: 7px;
  left: -20px;
}
.layout-nav {
  width: 180px;
  margin: 0 auto;
  margin-right: 1px;
}
.layout-copy {
  background: #ddd;
  position: fixed;
  bottom: 0;
  left: 200px;
  width: calc(100% - 200px);
  z-index: 999;
}
</style>
