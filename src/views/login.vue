<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">LOGIN</h3>
    <el-form-item prop="userid">
      <el-input type="text" v-model="loginForm.userid" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="loginSubmit" :loading="logining">Login</el-button>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="turnToSignup">Signup</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        userid: '',
        password: ''
      },
      rules: {
        userid: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '账号只能为数字!' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      logining: false,
      errormsg: '',
      centerDialogVisible: false,
      checked: true
    }
  },
  methods: {
    turnToSignup () {
      this.$router.push({ path: '/signup' })
    },
    loginSubmit () {
      this.$refs.loginForm.validate((valid) => {
        var self = this;
        if (valid) {
          this.logining = true
          axios({
            method: 'POST',
            url: '/api/users/login',
            data: {
              userid: this.loginForm.userid,
              password: this.loginForm.password
            }
          })
            .then(function (res) {
              if (res.data=='no') {
                self.$alert('No Such User', 'ERROR', {
                  confirmButtonText: '确定',
                  center: true
                });
              }
              if (res.data == 'passwrong') {
                self.$alert('Password Wrong', 'ERROR', {
                  confirmButtonText: '确定',
                  center: true
                });
              }
              if (res.data == 'success') {
                self.$alert('Login Success', 'SUCCESS', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    self.$router.push({
                      path: '/home',
                      name: 'home',
                      query: {
                        userid: self.loginForm.userid
                      }
                    })
                  }
                });
            }
            self.logining = false
            })
        } else {
          this.$alert('Input Invalid', 'ERROR', {
          confirmButtonText: '确定',
          center: true
          });
        }
      })
    }
  }
}
</script>

<style>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
	}
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
  	}
</style>
