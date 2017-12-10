<template>
  <el-form :model="addNoteForm" :rules="rules" ref="addNoteForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">Add New Note</h3>
    <h4>ID: {{this.$route.query.userid}}&nbsp;Name: {{this.$route.query.username}}</h4>
    <h4>Notebook: {{this.$route.query.nbid}}.{{this.$route.query.nbname}}</h4>
    <el-form-item prop="ntitle">
      <el-input type="text" v-model="addNoteForm.ntitle" auto-complete="off" placeholder="笔记标题"></el-input>
    </el-form-item>
    <el-form-item prop="content">
      <el-input type="textarea" :rows="5" v-model="addNoteForm.content" auto-complete="off" placeholder="笔记"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:40%;" @click="addNoteSubmit">Add</el-button>
      <el-button type="primary" style="width:40%;" @click="cancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
        addNoteForm: {
          ntitle: '',
          content: ''
        },
        rules: {
          ntitle: [
            { required: true, message: '笔记标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '笔记不能为空', trigger: 'blur' }
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
    addNoteSubmit () {
      this.$refs.addNoteForm.validate((valid) => {
        var self = this;
        if (valid) {
          axios({
            method: 'POST',
            url: '/api/note/addNote',
            data: {
              userid: this.$route.query.userid,
              nbid: this.$route.query.nbid,
              nbname: this.$route.query.nbname,
              ntitle: this.addNoteForm.ntitle,
              content: this.addNoteForm.content
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
