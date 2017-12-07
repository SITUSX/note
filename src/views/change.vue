<template>
  <el-form :model="changeForm" :rules="rules" ref="changeForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">Change Password</h3>
    <h4>ID: {{this.$route.query.userid}}</h4>
    <h4>Name: {{this.$route.query.username}}</h4>
    <el-form-item prop="username">
      <el-input type="text" v-model="changeForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="changeForm.password" auto-complete="off" placeholder="新密码"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <el-input type="password" v-model="changeForm.confirmPassword" auto-complete="off" placeholder="确认新密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%;" @click="changeSubmit">Change</el-button>
      <el-button type="primary" style="width:40%;" @click="cancel">Cancel</el-button>
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
        callback(new Error('请输入新密码'));
      } else {
        callback();
      }
    };
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.changeForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
        changeForm: {
          username: this.$route.query.username,
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
        }
      }
  },
  methods: {
    cancel () {
      this.$router.push({
        path: '/home',
        name: 'home',
        query: {
          userid: this.$route.query.userid,
          username: this.$route.query.username
        }
      })
    },
    changeSubmit () {
      this.$refs.changeForm.validate((valid) => {
        var self = this;
        if (valid) {
          console.log('here');
          axios({
            method: 'POST',
            url: '/api/users/change',
            data: {
              userid: this.$route.query.userid,
              username: this.changeForm.username,
              password: this.changeForm.password
            }
          })
            .then(function (res) {
              if (res.data=='err') {
                self.$alert('Change Failed', 'ERROR', {
                  confirmButtonText: '确定',
                  center: true
                });
              }
              else {
                self.$alert('Change Success', 'SUCCESS', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    self.$router.push({
                      path: '/home',
                      name: 'home',
                      query: {
                        userid: self.$route.query.userid,
                        username: self.changeForm.username
                      }
                    })
                  }
                });
            }
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
