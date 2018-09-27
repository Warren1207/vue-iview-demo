<template>
  <div class="login">
      <div class="login-container"></div>
      <div class="login-from">
          <div class="login-icon"></div>
          <div class="login-input-container">
              <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
                <FormItem prop="userName">
                  <Input v-model="form.userName" :style="{height: '40px'}" placeholder="用户名"></Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" class="login-input" v-model="form.password" placeholder="密码"></Input>
                </FormItem>
                <FormItem>
                  <Row>
                     <Col span="8">
                        <Button @click="handleSubmit" type="primary" long>登录</Button>
                     </Col>
                     <Col span="8" offset="8" style="text-align: right;">
                        <Checkbox v-model="remember">记住密码</Checkbox>
                     </Col>
                  </Row>
                </FormItem>
              </Form>
          </div>
      </div>
      <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      remember: false,
      spinShow: false,
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  mounted: function () {
    if (localStorage.getItem('gac_l_user_name')) {
      this.form.userName = localStorage.getItem('gac_l_user_name')
      this.form.password = localStorage.getItem('gac_l_user_password')
      this.remember = true
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.spinShow = true
          this.handleLogin({
            userName: this.form.userName,
            password: this.form.password }).then(res => {
            this.spinShow = false
            if (res.State === 1) {
              this.$Message.error('用户名或密码错误！')
              return
            }
            if (this.remember) {
              localStorage.setItem('gac_l_user_name', this.form.userName)
              localStorage.setItem('gac_l_user_password', this.form.password)
              localStorage.setItem('gac_l_user_remember', true)
            }
            this.getUserInfo().then(res => {
              let name = 'home'
              if (res.UserType === 0) { // 普通用户
                name = 'plan'
              }
              this.$router.push({
                name: name
              })
            })
          })
        } else {
          this.$Message.error('请填写用户名及密码！')
        }
      })
    }
  }
}
</script>
<style scoped>
  .login {
     width: 100%;
     height: 100%;
     background: url('../../assets/bg.jpg');
     background-repeat:no-repeat;
     background-size:100% 100%;
     -moz-background-size:100% 100%;
  }
  .login-container{
     width: 420px;
     height: 470px;
     background-color: #000000;
     opacity: 0.15;
     margin: auto;
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
  }
  .login-from{
    width: 400px;
    height: 450px;
    background-color: #FFFFFF;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .login-icon{
    background: url('../../assets/login.png');
    background-repeat:no-repeat;
    width: 173px;
    height: 102px;
    position: absolute;
    top: 55px;
    left: 110px;
  }
  .login-input-container{
    position: absolute;
    width: 100%;
    height: 170px;
    padding: 0 40px;
    top: 200px;
  }
</style>
