<template>
  <div class="container">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column label="ID">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <i class="el-icon-info"></i>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      tableData: null
    }
  },
  methods: {
    init() {
      var self = this;
      axios({
        method: 'GET',
        url: '/api/manage/allUsers'
      }).then(function (res) {
        self.tableData = res.data;
        console.log(tableData);
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/mchange',
        name: 'mchange',
        query: {
          userid: row.userid,
          username: row.username
        }
      })
    },
    handleDelete(index, row) {
      var self = this;
      axios({
        method: 'POST',
        url: '/api/manage/deleteUser',
        data: {
          userid: row.userid
        }
      }).then(function (res) {
        if (res.data === 'err') {
          self.$alert('Wrong', 'ERROR', {
            confirmButtonText: '确定',
            center: true
          });
        } else {
          self.$alert('Delete', 'SUCCESS', {
            confirmButtonText: '确定',
            center: true,
            callback: action => {
              location.reload();
            }
          });
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
.container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 50px auto;
  width: 50%;
  padding: 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.label {
  text-align: center;
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
</style>
