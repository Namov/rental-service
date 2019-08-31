<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">管理合同</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="(list,index) in lists" v-bind:key="list.id">
          <div class="orderShow" >
            <el-row >
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="label">
                  <div style="padding: 5px">
                    <el-link :underline="false" style="font-size: 16px" :href=list.url target="_blank">与{{list.tenantName}}的合同</el-link>
                    <time class="time">{{list.checkInDay}}至</time>
                    <time class="time">{{list.leaveDay}}</time>
                  </div>
                  <div class="buttongroup">
                    <el-button class="button" type="primary" @click="reject(list,lists,index)" :disabled=list.chargebuttondisabled>删除</el-button>
                    <el-button class="button" type="primary"@click="view(list)">查看详情</el-button>
                    <!--                    <el-button class="button" type="success" plain @click="charge(list.orderid)" :disabled=list.chargebuttondisabled>{{list.chargebutton}}</el-button>-->
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
    <el-dialog title="订单详细信息" :visible.sync="viewDialogVisible" width="40%" style="text-align: left">
      <p>房源：{{this.viewAddress}}</p>
      <p>状态：{{this.viewStatus}}</p>
      <p>类型：{{this.viewType}}</p>
      <p>租客姓名：{{this.viewTenantName}}</p>
      <p>入住时间：{{this.viewCheckInTime}}</p>
      <p>到期时间：{{this.viewDueTime}}</p>
      <p>下单时间：{{this.viewCreatedTime}}</p>
      <p>订单号：{{this.viewOrderId}}</p>
    </el-dialog>
  </div>
</template>
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
    text-align: right;
    float: right;
  }

  .position {
    padding: 5px;
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .buttongroup {
    margin-top: 15px;
  }

  .el-button {
    float: right;
    margin: 10px;
    width: auto;
  }

  .image {
    height: 120px;
    display: inline-block;
    float: left;
    width: 120px;
    padding: 15px;
  }

  .label {
    padding: 14px;
    text-align: left;
    margin-left: 150px;
  }

  .el-card {
    height: 150px;
    margin: 5px;
  }

</style>

<script>
    export default {
        inject: ['reload'],
        data() {
            return {
                name: 'ManageContract',
                loading: false,
                id: 1,
                total: 0,
                count: 0,
                lists: [],
                orders: [],
                viewDialogVisible: false,
                viewAddress: '',
                viewStatus: '',
                viewType: '',
                viewCheckInTime: '',
                viewDueTime: '',
                viewCreatedTime: '',
                viewOrderId: '',
                viewTenantName: ''
            }
        },
        mounted() {
            // get total here
            let self = this
            this.$axios.get('/api/getlongRentOrderContract').then((res) => {
                //console.log(res)
                self.lists = res.data
                self.total = self.list.length
            })
        },
        computed: {
            noMore() {
                return this.count >= this.total
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
        methods: {
            load() {
                this.loading = true
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        if (this.count >= this.total) {
                            break
                        }
                        // get order information here
                        let status = ''
                        let chargebutton = ''
                        let chargebuttondisabled = true
                        this.loading = false}
                }, 500)
            },
            view(order) {
                this.viewDialogVisible = true
                this.viewAddress = order.address
                this.viewStatus = order.status
                this.viewType = order.roomtype + '  ' + order.renttype
                this.viewCheckInTime = order.checkinday
                this.viewDueTime = order.leaveday
                this.viewCreatedTime = order.createdtime
                this.viewOrderId = order.orderid
                this.viewTenantName = order.tenantName
            },
            reject(list,lists,index) {
                var type = list.renttype
                var state = list.state
                var order = list.order
                var data
                    let id=order.id
                    this.$axios.post('/api/deleteLongRentOrder?id='+id)
                    alert('合同已删除')
                    lists.splice(index,1)

            }

        }
    }
</script>

<style scoped>

</style>
