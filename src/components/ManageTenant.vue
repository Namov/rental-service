<template>
  <div>
    <h2 style="padding-left: 10px; text-align: left">管理租客信息</h2>

    <el-table
      ref="filterTable"
      :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="电子邮箱"
        prop="email">
      </el-table-column>
      <el-table-column
        label="年龄"
        prop="age">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="isMale">
        <template slot-scope="scope">
          <span v-if="scope.row.male===true">男</span>
          <span v-else>女</span>
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入用户名搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改租客信息" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop = "username">
          <el-input v-model="form.username" autocomplete="off" :disabled=true></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop = "phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth" prop = "email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop = "age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop = "isMale">
          <el-select v-model="form.male" placeholder="性别" style="width: 100%">
            <el-option label="男" :value=true></el-option>
            <el-option label="女" :value=false></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ManageTenant',
    data: function () {
      return {
        tableData: [],
        dialogEditVisible: false,
        form: {
          username: '',
          password: '',
          phone: '',
          email: '',
          male: '',
          age: ''
        },
        formLabelWidth: '120px',
        search: '',
        text: '',
        urls: []
      }
    },
    mounted: function () {
      this.getTenants()
    },
    methods: {

      openEdit (index, row) {
        this.form = row
        this.dialogEditVisible = true
      },
      getTenants () {
        this.$axios.get('/api/tenant/getAll', {withCredentials: true}).then(res => {
          this.tableData = res.data
        })
      },
      handleSubmit () {
        this.$axios.post('/api/tenant/update', this.form, {withCredentials: true}).then(res => {
          alert('修改成功')
          this.dialogAddVisible = false
          this.dialogEditVisible = false
          this.getTenants()
        })
      },
      formReset() {
        this.form = {
          username: '',
          password: '',
          phone: '',
          email: '',
          male: '',
          age: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
