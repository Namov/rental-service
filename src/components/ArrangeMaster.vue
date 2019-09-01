<template>
  <div>
    <el-button type="info" @click="SdialogFormVisible=true">导入师傅</el-button>

    <el-dialog  title="导入师傅" :visible.sync="SdialogFormVisible">
      <el-form :model="master">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="master.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="master.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitMaster()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  title="安排师傅" :visible.sync="AdialogFormVisible">
      <el-form :model="newWorkorder">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-select v-model="newWorkorder.maintenanceName" placeholder="请选择">
            <el-option
              v-for="item in masters"
              :key="item.id"
              :label.text="item.username+'  分数：'+item.ascore"
              :value="item.username">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitWorkorder()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="order-wrap">
      <h2 style="padding-left: 10px; text-align: left">未处理工单</h2>
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          style="list-style-type: none;padding-inline-start: 0px">
          <li v-for="workorder in workorders" v-bind:key="workorder.id">
            <div class="orderWorkorder">
              <el-row>
                <el-card :body-style="{ padding: '50px' }" shadow="hover">
                  <div class="label">
                    <div style="padding: 5px">
                      <el-row>
                        <el-col :span="6">
                          <time class="time">{{workorder.createdTime}}</time>
                        </el-col>
                        <el-col :span="18">
                          <el-row>
                            <el-col>
                              <div>{{workorder.message}}</div>
                            </el-col >
                            <el-col v-if="workorder.urls!=null&&workorder.urls.length>0">
                              <el-row :gutter="10" style="text-align: right;float:right" v-for="url in workorder.urls" v-bind:key="url">
                                <el-col style="text-align: right;display: inline-block" :span="6">
                                  <el-image
                                    style="width: 100px; height: 100px;text-align: right"
                                    :src="url"
                                    :preview-src-list="srcList">
                                  </el-image>
                                </el-col>
                              </el-row>
                            </el-col>
                            <el-button @click="openArrange(workorder)">安排师傅</el-button>
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
  </div>
</template>

<script>
    import {getCookie} from '../assets/js/cookie.js'
    export default {
        name: 'Unresolve',
        data () {
            return {
                text: '',
                urls: [],
                SdialogFormVisible: false,
                AdialogFormVisible: false,
                workorders: [],
                masters: [],
                newWorkorder: {
                    stats:6003,
                    message: '',
                    address: '',
                    tenantUsername: '',
                    maintenanceName: ''
                },
                master: {
                    username: '',
                    phone: '',
                    ascore:5.0,
                    times:0.0
                }
            }
        },
        mounted () {
            var self = this
            this.$axios.get('/api/workorder/getAllOrder').then((res) => {
                self.workorders = res.data
            })
            this.$axios.get('/api/miantenanceman/getAll').then((res) => {
                self.masters = res.data
                console.log(self.masters)
            })
        },
        methods: {
            commitMaster () {
                this.$axios.post('/api/maintenanceman', this.master)
                this.SdialogFormVisible = false
                alert("添加成功")
            },
            openArrange (workorder) {
                this.AdialogFormVisible = true
                this.newWorkorder = workorder
            },
            commitWorkorder () {
                this.newWorkorder.stats = 6003
                var i=this.newWorkorder
                console.log(i)
                this.$axios.post('/api/workorder/update', i)
                this.SdialogFormVisible = false
                this.AdialogFormVisible = false
            }
        }
    }
</script>

<style scoped>

</style>
