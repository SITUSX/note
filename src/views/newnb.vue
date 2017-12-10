<template>
  <el-form :model="addNbForm" :rules="rules" ref="addNbForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">Add New Notebook</h3>
    <h4>ID: {{this.$route.query.userid}}</h4>
    <h4>Name: {{this.$route.query.username}}</h4>
    <el-form-item prop="nbname">
      <el-input type="text" v-model="addNbForm.nbname" auto-complete="off" placeholder="笔记本名"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%;" @click="addNbSubmit">Add</el-button>
      <el-button type="primary" style="width:40%;" @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
        addNbForm: {
          nbname: ''
        },
        rules: {
          nbname: [
            { required: true, message: '笔记本名不能为空', trigger: 'blur' }
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
    addNbSubmit () {
      this.$refs.addNbForm.validate((valid) => {
        var self = this;
        if (valid) {
          axios({
            method: 'POST',
            url: '/api/notebook/addNotebook',
            data: {
              userid: this.$route.query.userid,
              nbname: this.addNbForm.nbname
            }
          }).then(function (res) {
              if (res.data==='err') {
                self.$alert('Add Failed', 'ERROR', {
                  confirmButtonText: '确定',
                  center: true
                });
              }
              else {
                self.$alert('Add Success', 'SUCCESS', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    self.$router.push({
                      path: '/home',
                      name: 'home',
                      query: {
                        userid: self.$route.query.userid,
                        username: self.$route.query.username
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
