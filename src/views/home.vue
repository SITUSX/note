<template>
  <div>
  <el-row class="home">
    <el-col :span="24" class="header">
      <el-col :span="8" class="logo">
        <i class="el-icon-edit"></i>
        <span>Note</span>
      </el-col>
      <el-col :span="12">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search"
          style="width: 300px">
        </el-input>
        <el-button type="info">搜索</el-button>
      </el-col>
			<el-col :span="4" class="userInfo">
				<el-dropdown trigger="hover">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="setInfo">设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
        <span class='welcome'>
          ID:{{ this.$route.query.userid }}
          &nbsp;&nbsp;&nbsp;&nbsp;
          Welcome,&nbsp;{{ this.$route.query.username }}&nbsp;!
        </span>
			</el-col>
    </el-col>
    <el-col :span="24" class="main">
      <el-col :span="6">
      <el-aside class="side">
        <el-menu
        :default-openeds="['1']"
        background-color="#eef1f6"
        text-color="#000"
        active-text-color="#00BBFF">
          <!-- <el-submenu v-for="notebook in notebooks">
            <template slot="title">
              {{ notebook.nbid}}.{{ notebook.nbname }}
            </template>
          </el-submenu> -->
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
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="note-title"
            v-model="ntitle"
            :disabled="true"
            style="margin: 0 15px; padding: 0 15px">
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
            v-model="nbname"
            style="margin: 0 15px; padding: 0 15px">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="note-title"
            v-model="ntitle"
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
        <el-button type="info" plain>
          撤销
          <i class="el-icon-circle-close el-icon--right"></i>
        </el-button>
        <el-button type="primary">
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
      search:'',
      nbname:'',
      ntitle:'',
      textarea1:'',
      textarea2:'',
      notebooks: null,
    }
  },
  methods: {
    init() {
      var userid = this.$route.query.userid;
      var username = this.$route.query.username;
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
}
.side {
  border-color: rgba(238,241,146,0.3);
  height: 100%;
  width: 100%;
  background-color: #eef1f6;
}
</style>
