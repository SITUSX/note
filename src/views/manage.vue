<template>
  <el-form :model="manage" :rules="rules" ref="manage" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">Manage</h3>
    <el-form-item prop="password">
      <el-input type="password" v-model="manage.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%;" @click="manageLogin">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
        manage: {
          password: ''
        },
        rules: {
          password: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
  },
  methods: {
    manageLogin() {
      this.$refs.manage.validate((valid) => {
        var self = this;
        if (valid) {
          axios({
            method: 'POST',
            url: '/api/manage/login',
            data: {
              password: this.manage.password
            }
          }).then(function (res) {
            if (res.data == 'err') {
              self.$alert('PASSWORD WRONG', 'ERROR', {
                confirmButtonText: '确定',
                center: true
              });
            } else {
              self.$router.push({
                path: '/user',
                name: 'user'
              })
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
</style>
