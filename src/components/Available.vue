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
        <el-form-item label="短租价格" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.priceForDay" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="长租价格" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.priceForMonth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="面积" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <br>
          <!--        action="https://localhost:8081/file/uploadImages"-->
          <el-upload
            style="text-align: left"
            list-type="picture-card"
            :http-request="uploadImgs"
            action="/api/file/uploadHouseImage"
            :file="file"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改房源信息" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="面积" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth" prop = "type">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop = "address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="短租价格" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.priceForDay" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="长租价格" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.priceForMonth" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="面积" :label-width="formLabelWidth" prop = "roomId">
          <el-input v-model="form.area" autocomplete="off"></el-input>
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
        label="图片"
        prop="imageUrls">
        <template slot-scope="scope">
          <img  :src="scope.row.imageUrls" alt="" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        prop="type">
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
        label="长租价格"
        prop="priceForMonth">
      </el-table-column>
      <el-table-column
        label="面积"
        prop="area">
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
        type: '',
        urls: ''
      },
      formLabelWidth: '120px',
      search: '',
      fileList: [],
      text: '',
      username: '',
      urls: [
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160807.jpg',
        'http://icon.nipic.com/BannerPic/20160426/photo/20160426160826.jpg'
      ],
      dialogImageUrl: '',
      dialogVisible: false
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
    },
    uploadImgs (file) {
      let param = new FormData()
      param.append('image', file.file)
      this.$axios({
        method: 'post',
        url: '/api/file/uploadHouseImage',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: param,
        withCredentials: true
      }).then(res => {
        this.form.urls.push(res.data)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
