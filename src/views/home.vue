<template>
  <el-row class="home">
    <el-col :span="24" class="header">
      <el-col :span="8" class="logo">Note</el-col>
      <el-col :span="14">&nbsp;</el-col>
			<el-col :span="2" class="userInfo">
				<el-dropdown trigger="hover">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="setInfo">设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
        <span style="color: #000">{{ this.$route.query.userid }}</span>
			</el-col>
    </el-col>
    <el-col :span="24" class="main">
      <el-aside class="side">
        <el-menu :default-openeds="['1','2','3']">
          <el-submenu index="1">
            <template slot="title">notebook1</template>
            <el-menu-item index="1-1">note1</el-menu-item>
            <el-menu-item index="1-2">note2</el-menu-item>
            <el-menu-item index="1-3">note3</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">notebook2</template>
            <el-menu-item index="2-1">note1</el-menu-item>
            <el-menu-item index="2-2">note2</el-menu-item>
            <el-menu-item index="2-3">note3</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">notebook3</template>
            <el-menu-item index="3-1">note1</el-menu-item>
            <el-menu-item index="3-2">note2</el-menu-item>
            <el-menu-item index="3-3">note3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <section class="content">

      </section>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      init() {
        var userid = this.$route.query.userid
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
.logo {
	height:60px;
  width: 300px;
	font-size: 22px;
	border-color: rgba(238,241,146,0.3);
	border-right-width: 1px;
	border-right-style: solid;
}
.main {
  display: flex;
  position: absolute;
	top: 60px;
	bottom: 0px;
	overflow: hidden;
}
.side {
  border-color: rgba(238,241,146,0.3);
  width: 250px;
  background-color: #eef1f6;
}
</style>
