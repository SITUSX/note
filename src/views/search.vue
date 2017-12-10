<template>
  <div>
  <label>ID.{{ userid }}&nbsp;&nbsp;Name.{{ username }}</label>
  <label>Token:&nbsp;{{ token }}</label>
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
label {
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  margin: 30px;
  padding: 10px;
}
el-table {
  margin: 20px;
}
</style>
