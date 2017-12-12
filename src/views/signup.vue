<template>
  <el-form :model="signupForm" :rules="rules" ref="signupForm" label-position="left" label-width="0px" class="signup-container">
    <el-button type="primary" plain class="back" @click="backToLogin">Back</el-button>
    <h3 class="title">SIGNUP</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="signupForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="signupForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input type="password" v-model="signupForm.confirmPassword" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="signupSubmit" :loading="signuping">Signup</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名称不能为空'));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.signupForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      signupForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        username: [
          { validator: checkName, trigger: 'blur' },
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      signuping: false,
      msg: '',
      centerDialogVisible: false
    }
  },
  methods: {
    backToLogin () {
      this.$router.push({ path: '/' })
    },
    signupSubmit () {
      this.$refs.signupForm.validate((valid) => {
        var self = this;
        if (valid) {
          this.signuping = true
          axios({
            method: 'POST',
            url: '/api/users/signup',
            data: {
              username: this.signupForm.username,
              password: this.signupForm.password
            }
          })
            .then(function (res) {
              if (res.date != 'exist') {
                var message = 'Signup Success, userid is  ' + res.data;
                self.$alert(message, 'ERROR', {
                confirmButtonText: '确定',
                center: true,
                callback: action => {
                  self.$router.push({
                    path: '/home',
                    name: 'home',
                    query: {
                      userid: res.data,
                      username: self.signupForm.username
                    }
                  })
                }
                });
              }
              if (res.data == 'exist') {
                self.$alert('Username Exists', 'ERROR', {
                confirmButtonText: '确定',
                center: true
                });
              }
              self.signuping = false
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
  .signup-container {
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
    .back {
      float: left;
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
