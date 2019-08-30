<template>
  <div>
    <h2 style="padding-left: 10px; text-align: left">回复投诉</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="(complaint,index) in complaints" v-bind:key="complaint.id">
          <div class="orderComplain">
            <el-row>
              <el-card :body-style="{ padding: '50px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-row>
                      <el-col :span="6">
                        <time class="time">{{complaint.createdTime}}</time>
                      </el-col>
                      <el-col :span="8">
                        <el-card shadow="always">
                          <el-form ref="form" label-width="80px">
                            <el-form-item label="回复投诉">
                              <el-input   type="textarea"
                                          :rows="2" v-model="complaint.reply" placeholder="回复内容"></el-input>
                            </el-form-item>
                            <el-form-item>
                              <el-button type="primary" @click="reply(complaint,index)">提交</el-button>
                              <el-button>取消</el-button>
                            </el-form-item>
                          </el-form>
                        </el-card>
                      </el-col>
                      <el-col :span="8">
                        <el-row>
                          <el-col>
                            <div><h4>投诉内容：</h4>{{complaint.message}}</div>
                          </el-col >
                          <el-col v-if="complaint.urls!=null&&complaint.urls.length>0">
                            <el-row :gutter="10" style="text-align: right;float:right" v-for="url in complaint.urls" v-bind:key="url">
                              <el-col style="text-align: right;display: inline-block" :span="6">
                                <el-image
                                  style="width: 100px; height: 100px;text-align: right"
                                  :src="url"
                                  :preview-src-list="srcList">
                                </el-image>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-row>
          </div>
        </li>
      </ul>
      <p v-if="loading" style="color: #2c3e50">加载中...</p>
      <p v-if="noMore" style="color: #2c3e50">没有更多了</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReplyComplaint',
    data () {
        return {
            fileList: [],
            urls: [],
            dialogImageUrl: '',
            dialogVisible: false,
            SdialogFormVisible: false,
            complaints: []
        }
    },
    mounted () {
        var self = this
        this.$axios.post('/api/complaints/getAllTenantComplaints').then((res) => {
            self.complaints = res.data
            // self.urls = self.complains.urls
        })
    }
    ,
    methods:{
      reply(complaint,index){
        let data={
            'replyMessage':complaint.reply,
            'complaintId':complaint.id
        }
        var self=this
        this.$axios.post('/api/complaints/reply',data).then(()=>{
            self.complaints.splice(index,1)
            alert('回复成功')
        })
      }
    }
}
</script>

<style scoped>

</style>
