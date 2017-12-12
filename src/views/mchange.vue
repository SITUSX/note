<template>
  <el-form :model="mchangeForm" :rules="rules" ref="mchangeForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">Edit User</h3>
    <h4>ID: {{this.$route.query.userid}}</h4>
    <el-form-item prop="username">
      <el-input type="text" v-model="mchangeForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%;" @click="mchangeSubmit">Edit</el-button>
      <el-button type="primary" style="width:40%;" @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
        mchangeForm: {
          username: this.$route.query.username
        },
        rules: {
          username: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ]
        }
      }
  },
  methods: {
    cancel () {
      this.$router.push({
        path: '/user',
        name: 'user'
      })
    },
    mchangeSubmit ()  {
      this.$refs.mchangeForm.validate((valid) => {
        var self = this;
        if (valid) {
          axios({
            method: 'POST',
            url: '/api/manage/editUser',
            data: {
              userid: this.$route.query.userid,
              username: this.mchangeForm.username
            }
          }).then(function (res) {
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
                      path: '/user',
                      name: 'user'
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
