<template>
  <div>
  <el-row class="home" v-loading.fullscreen.lock="fullscreenLoading">
    <el-col :span="24" class="header">
      <el-col :span="8" class="logo">
        <i class="el-icon-edit"></i>
        <span>Note</span>
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="token"
          style="width: 300px">
        </el-input>
        <el-button type="info" @click="search()">搜索</el-button>
      </el-col>
			<el-col :span="4" class="userInfo">
        <el-button type="text" @click="addNotebook()">
          <i class="el-icon-plus"></i>
        </el-button>
				<el-dropdown trigger="hover">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided @click.native="setInfo">设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
        <span class='welcome'>
          ID:{{ userid }}
          &nbsp;&nbsp;&nbsp;&nbsp;
          Welcome,&nbsp;{{ username }}&nbsp;!
        </span>
			</el-col>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="6">
      <el-aside class="side">
        <el-menu
        :default-openeds="['1', '2']"
        background-color="#eef1f6"
        text-color="#000"
        active-text-color="#00BBFF">
        <el-submenu index="1">
          <template slot="title">
            笔记本列表
          </template>
          <el-menu-item v-for="notebook in notebooks" :key="notebook.nbid.toString()" :index="notebook.nbid.toString()">
            <template slot="title">
              {{ notebook.nbid}}.{{ notebook.nbname }}
              <el-button type="text" style="float: right" @click="deleteNotebook(notebook.nbid)">
                <i class="el-icon-delete"></i>
              </el-button>
              <el-button type="text" style="float: right" @click="addNote(notebook.nbid, notebook.nbname)">
                <i class="el-icon-plus"></i>
              </el-button>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            笔记列表
          </template>
          <el-menu-item v-for="note in notes" @click="read(note.nid, note.nbid, note.ntitle, note.nbname)" :key="note.nbid.toString()+note.nid.toString()" :index="note.nbid.toString()+note.nid.toString()">
            <template slot="title">
              {{note.nbid}}.{{note.nbname}}:&nbsp;
              {{note.nid}}.{{note.ntitle}}
              <el-button type="text" style="float: right" @click="deleteNote(note.nid)">
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-menu-item>
        </el-submenu>
        </el-menu>
      </el-aside>
    </el-col>
    <el-col :span="12" class="content">
      <section style="width: 100%; height: 100%">
        <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="notebook-name"
            v-model="nbname"
            :disabled="true"
            style="margin: 0 15px; padding: 0 15px">
            <template slot="prepend">
              <label>ID.&nbsp;{{ nbid }}</label>
            </template>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="note-title"
            v-model="ntitle"
            :disabled="true"
            style="margin: 0 15px; padding: 0 15px">
            <template slot="prepend">
              <label>ID.&nbsp;{{ nid }}</label>
            </template>
          </el-input>
        </el-col>
        </el-row>
        <el-input
        type="textarea"
        :rows="10"
        :disabled="true"
        v-model="textarea1"
        class="area">
        </el-input>
        <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="notebook-name"
            v-model="nbnameChanged"
            style="margin: 0 15px; padding: 0 15px">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="note-title"
            v-model="ntitleChanged"
            style="margin: 0 15px; padding: 0 15px">
          </el-input>
        </el-col>
        </el-row>
        <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="textarea2"
        class="area">
        </el-input>
        <el-button type="info" plain @click="revert">
          撤销
          <i class="el-icon-circle-close el-icon--right"></i>
        </el-button>
        <el-button type="primary" @click="change">
          保存
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </section>
    </el-col>
    </el-col>
  </el-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      fullscreenLoading: false,
      userid:'',
      username: '',
      nbid: '',
      nid: '',
      token:'',
      nbname:'',
      nbnameChanged:'',
      ntitle:'',
      ntitleChanged:'',
      textarea1:'',
      textarea2:'',
      notebooks: null,
      notes: null
    }
  },
  methods: {
    init() {
      this.fullscreenLoading = true;
      this.userid = this.$route.query.userid;
      this.username = this.$route.query.username;
      var userid = this.userid;
      var username = this.username;
      var self = this;
      axios({
        method: 'POST',
        url: '/api/notebook/getNotebook',
        data: {
          userid: userid
        }
      }).then(function (res) {
          self.notebooks = res.data;
        });
      axios({
        method: 'POST',
        url: '/api/note/getAllNote',
        data: {
          userid: userid
        }
      }).then(function (res) {
          self.notes = res.data;
      });
      setTimeout(() => {
          this.fullscreenLoading = false;
      }, 500);
    },
    read (nid, nbid, ntitle, nbname) {
      var self = this;
      axios({
        method: 'POST',
        url: '/api/note/getNoteContent',
        data: {
          nid: nid
        }
      }).then(function (res) {
          self.nbid = nbid;
          self.nid = nid;
          self.ntitle = ntitle;
          self.ntitleChanged = ntitle;
          self.nbname = nbname;
          self.nbnameChanged = nbname;
          self.textarea1 = res.data;
          self.textarea2 = res.data;
      });
    },
    setInfo () {
      this.$router.push({
        path: '/change',
        name: 'change',
        query: {
          userid: this.$route.query.userid,
          username: this.$route.query.username
        }
      })
    },
    logout () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push({path: '/'})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    revert () {
      this.nbnameChanged = this.nbname;
      this.ntitleChanged = this.ntitle;
      this.textarea2 = this.textarea1;
    },
    generalAlert(resdata, display){
      if (resdata === 'success') {
        this.$alert(display, 'SUCCESS', {
          confirmButtonText: '确定',
          center: true,
          callback: action => {
            location.reload();
          }
        });
      } else {
        this.$alert('Wrong', 'ERROR', {
          confirmButtonText: '确定',
          center: true
        });
      }
    },
    change () {
      var nbid = this.nbid;
      var nid = this.nid;
      var nbname = this.nbnameChanged;
      var ntitle = this.ntitleChanged;
      var content = this.textarea2;
      var self = this;
      this.$confirm('是否确定保存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        axios({
          method: 'POST',
          url: '/api/notebook/changeName',
          data: {
            nbid: nbid,
            nbname: nbname
          }
        }).then(function (res) {
          if (res.data==='success') {
            axios({
              method: 'POST',
              url: '/api/note/changeNote',
              data: {
                nid: nid,
                ntitle: ntitle,
                content: content
              }
              }).then(function (res2) {
                self.generalAlert(res2.data, 'Change success!');
            });
          } else {
            self.$alert('Wrong', 'ERROR', {
              confirmButtonText: '确定',
              center: true
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    deleteNote(nid) {
      var self =this;
      this.$confirm('是否确定删除笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        axios({
          method: 'POST',
          url: '/api/note/deleteNote',
          data: {
            nid: nid
          }
        }).then(function (res) {
          self.generalAlert(res.data, 'Delete Note success');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    },
    deleteNotebook(nbid) {
      var self =this;
      this.$confirm('是否确定删除笔记本以及该笔记本所有笔记?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        axios({
          method: 'POST',
          url: '/api/notebook/deleteNotebook',
          data: {
            nbid: nbid
          }
        }).then(function (res) {
          self.generalAlert(res.data, 'Delete Notebook success');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    },
    addNotebook(){
      this.$router.push({
        path: '/newnb',
        name: 'newnb',
        query: {
          userid: this.userid,
          username: this.username
        }
      })
    },
    addNote(nbid, nbname){
      this.$router.push({
        path: '/newn',
        name: 'newn',
        query: {
          userid: this.userid,
          username: this.username,
          nbid: nbid,
          nbname: nbname
        }
      })
    },
    search(){
      this.$router.push({
        path: '/search',
        name: 'search',
        query: {
          userid: this.userid,
          username: this.username,
          token: this.token
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
.home {
  position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
.header {
	height: 60px;
	line-height: 60px;
	background: #bbb;
	color:#fff;
}
.userinfo {
  text-align: right;
	padding-right: 0px;
	float: right;
}
.welcome {
  color: #000;
  font-family: "Helvetica Neue";
  font-weight: 400;
  font-size: 15px;
}
.logo {
	height: 60px;
  width: 300px;
	font-size: 22px;
	border-color: rgba(238,241,146,0.3);
	border-right-width: 1px;
	border-right-style: solid;
  background: #666;
}
.main {
  display: flex;
  position: absolute;
	top: 60px;
	bottom: 0px;
	overflow: hidden;
}
.content {
  width: 100%;
  margin: 15px;
  padding: 15px;
}
.area {
  width:90%;
  margin: 15px;
  padding: 15px;
  font-size: 30px;
}
.side {
  border-color: rgba(238,241,146,0.3);
  height: 100%;
  width: 100%;
  background-color: #eef1f6;
}
</style>
