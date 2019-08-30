<template>
  <div>
    <h2 style="padding-left: 10px; text-align: left">可用房源</h2>
    <h2 style="padding-left: 10px; text-align: left"><el-button @click="dialogAddVisible = true">新增房源</el-button></h2>

    <el-dialog title="新增房源" :visible.sync="dialogAddVisible">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth" prop = "type">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop = "address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间ID" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.roomId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改房源信息" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="类型" :label-width="formLabelWidth" prop = "type">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop = "address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间ID" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.roomId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData.filter(data => !search || data.address.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="房间ID"
        prop="roomId">
      </el-table-column>
      <el-table-column
        label="地址"
        prop="address">
      </el-table-column>
      <el-table-column
        label="短租价格"
        prop="priceForDay">
      </el-table-column>
      <el-table-column
        label="房东"
        prop="landLord.username">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入地址搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Available',
  data: function () {
    return {
      tableData: [],
      dialogAddVisible: false,
      dialogEditVisible: false,
      form: {
        address: '',
        roomId: '',
        type: ''
      },
      formLabelWidth: '120px',
      search: ''
    }
  },
  mounted: function () {
    this.getRooms()
  },
  methods: {
    openEdit (index, row) {
      console.log(row.roomId)
      this.form = row
      console.log(this.form.roomId)
      this.dialogEditVisible = true
    },
    handleDelete (index, row) {
      console.log(row.roomId)
      let params = new URLSearchParams()
      params.append('id', row.roomId)
      this.$axios.post('/api/room/removeById', params).then(res => {
        console.log(res)
        alert('yes')
        this.getRooms()
      })
    },
    getRooms () {
      this.$axios.get('/api/room/findAll', {withCredentials: true}).then(res => {
        this.tableData = res.data
        console.log(res)
      }, err => {
        console.log(err)
      })
    },
    handleSubmit () {
      this.$axios.post('/api/room/add', this.form, {withCredentials: true}).then(res => {
        this.getRooms()
        alert('yes!')
        this.dialogAddVisible = false
        this.dialogEditVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
