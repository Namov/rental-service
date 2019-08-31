<template>
  <div>
    <h2 style="padding-left: 10px; text-align: left">管理房源</h2>
    <h2 style="padding-left: 10px; text-align: left">
      <el-button @click="openAddDialog">新增房源</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
    </h2>
    <el-table
      ref="filterTable"
      :data="tableData.filter(data => !search || data.address.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="图片"
        prop="imageUrls">
        <template slot-scope="scope">
          <div class="demo-image__preview" v-for="url in scope.row.imageUrls" >
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :preview-src-list="scope.row.imageUrls">
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="房间类型"
        prop="type"
        column-key="type"
        :filters="[{text: '单人间', value: '单人间'}, {text: '双人间', value: '双人间'}, {text: '四人间', value: '四人间'}]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        label="出租类型"
        prop="rentType"
        :filters="[{text: '只能长租', value: 2004}, {text: '只能短租', value: 2005}, {text: '长租短租都可以', value: 2006}]"
        :filter-method="filterType">
        <template slot-scope="scope">
          <span v-if="scope.row.rentType===2004">只能长租</span>
          <span v-else-if="scope.row.rentType===2005">只能短租</span>
          <span v-else>长租短租都可以</span>
        </template>
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
        label="状态"
        prop="state"
        :filters="[{ text: '可出租', value: 2002 }, { text: '不可出租', value: 2001 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <i v-if="scope.row.state===2002"><el-tag type="success">可出租</el-tag></i>
          <i v-else><el-tag type="danger">不可出租</el-tag></i>
        </template>
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
            @click="openEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增房源" :visible.sync="dialogAddVisible">
      <el-form :model="form">
        <el-form-item label="房间类型" :label-width="formLabelWidth" prop = "type">
          <el-select v-model="form.type" placeholder="房间类型" style="width: 100%">
            <el-option label="单人间" value="单人间"></el-option>
            <el-option label="双人间" value="双人间"></el-option>
            <el-option label="四人间" value="四人间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出租类型" :label-width="formLabelWidth" prop = "rentType">
          <el-select v-model="form.rentType" placeholder="出租类型" style="width: 100%">
            <el-option label="只能长租" :value=2004></el-option>
            <el-option label="只能短租" :value=2005></el-option>
            <el-option label="长租短租都可以" :value=2006></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间状态" :label-width="formLabelWidth" prop = "state">
          <el-select v-model="form.state" placeholder="房间状态" style="width: 100%">
            <el-option label="可出租" :value=2002></el-option>
            <el-option label="不可出租" :value=2001></el-option>
          </el-select>
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
            ref="upload"
            style="text-align: left"
            list-type="picture-card"
            :http-request="uploadImgs"
            action="/api/file/uploadImage"
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
        <el-form-item label="房间类型" :label-width="formLabelWidth" prop = "type">
          <el-select v-model="form.type" placeholder="房间类型" style="width: 100%">
            <el-option label="单人间" value="单人间"></el-option>
            <el-option label="双人间" value="双人间"></el-option>
            <el-option label="四人间" value="四人间"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出租类型" :label-width="formLabelWidth" prop = "rentType">
          <el-select v-model="form.rentType" placeholder="出租类型" style="width: 100%">
            <el-option label="只能长租" :value=2004></el-option>
            <el-option label="只能短租" :value=2005></el-option>
            <el-option label="长租短租都可以" :value=2006></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间状态" :label-width="formLabelWidth" prop = "state">
          <el-select v-model="form.state" placeholder="房间状态" style="width: 100%">
            <el-option label="可出租" :value=2002></el-option>
            <el-option label="不可出租" :value=2001></el-option>
          </el-select>
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
        type: '',
        address: '',
        priceForDay: '',
        priceForMonth: '',
        area: '',
        state: '',
        rentType: '',
        imageUrls: []
      },
      formLabelWidth: '120px',
      search: '',
      text: '',
      username: '',
      urls: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted: function () {
    this.getRooms()
  },
  methods: {
    openAddDialog () {
      this.formReset()
      this.dialogAddVisible = true
    },
    openEdit (index, row) {
      this.form = row
      this.dialogEditVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        params.append('id', row.roomId)
        this.$axios.post('/api/room/removeById', params).then(res => {
          this.getRooms()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    getRooms () {
      this.$axios.get('/api/room/findAll', {withCredentials: true}).then(res => {
        this.tableData = res.data
      })
    },
    handleSubmit () {
      this.$axios.post('/api/room/add', this.form, {withCredentials: true}).then(res => {
        alert('提交成功')
        this.dialogAddVisible = false
        this.dialogEditVisible = false
        this.$refs.upload.clearFiles()
        this.getRooms()
      })
    },
    uploadImgs (file) {
      let param = new FormData()
      param.append('file', file.file)
      this.$axios({
        method: 'post',
        url: '/api/file/uploadImage',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: param,
        withCredentials: true
      }).then(res => {
        this.form.imageUrls.push(res.data)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.state === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    filterType(value, row) {
      return row.rentType === value;
    },
    formReset() {
      this.form = {
        type: '',
        address: '',
        priceForDay: '',
        priceForMonth: '',
        area: '',
        state: '',
        rentType: '',
        imageUrls: []
      }
    }
  }
}
</script>

<style scoped>

</style>
