<template>
  <div>
  <p class="label">ID:{{ userid }}&nbsp;&nbsp;Name:{{ username }}</p>
  <p class="label">Token:&nbsp;{{ token }}</p>
  <div class="container">
  <br/>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="nbid"
        label="笔记本ID">
      </el-table-column>
      <el-table-column
        prop="nbname"
        label="笔记本名">
      </el-table-column>
      <el-table-column
        prop="nid"
        label="笔记ID">
      </el-table-column>
      <el-table-column
        prop="ntitle"
        label="笔记标题">
      </el-table-column>
      <el-table-column
        prop="content"
        label="笔记">
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: null,
      userid:'',
      username:'',
      token:''
    }
  },
  methods: {
    init(){
      this.userid = this.$route.query.userid;
      this.username = this.$route.query.username;
      this.token = this.$route.query.token;
      var self = this;
      axios({
        method: 'POST',
        url: '/api/note/search',
        data: {
          userid: self.userid,
          token: self.token
        }
      }).then(function (res) {
        console.log(res.data);
        self.tableData = res.data;
      })
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style lang="css">
.container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 50px auto;
  width: 80%;
  padding: 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.label {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 10px auto;
  width: 20%;
  padding: 10px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 10px #cac6c6;
}
el-table {
  margin: 20px;
}
</style>
