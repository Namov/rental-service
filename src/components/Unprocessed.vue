<template>
  <div class="order-wrap">
    <h2 style="padding-left: 10px; text-align: left">待处理订单</h2>
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
                <img :src=list.image class="image">
                <div class="label">
                  <div style="padding: 5px">
                    <el-link :underline="false" style="font-size: 16px" :href=list.detailpage target="_blank">{{list.address}}({{list.status}}）</el-link>
                    <time class="time">{{list.createdtime}}</time>
                  </div>
                  <div class="position">{{list.roomtype}}&nbsp;&nbsp;{{list.renttype}}
                  </div>
                  <div class="buttongroup">
                    <el-button class="button" type="primary" @click="reject(list,lists,index)">不通过</el-button>
                    <el-button class="button" type="primary" @click="charge(list,lists,index)">{{list.chargebutton}}</el-button>
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
                name: 'Unprocessed',
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
            this.$axios.get('/api/getUnprocessedOrder').then((res) => {
                //console.log(res)
                self.orders = res.data
                self.total = self.orders.length
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
                        switch (this.orders[this.count].object.state) {
                            case 1823:
                                status = '待审核'
                                chargebutton = '通过审核'
                                chargebuttondisabled = true
                                break

                            case 1825:
                                if (this.orders[this.count].type === '短租') {
                                    status = '款项待确认'
                                    chargebutton = '确认'
                                    chargebuttondisabled = true
                                } else {
                                    status = '合同待确认'
                                    chargebutton = '确认'
                                    chargebuttondisabled = true
                                }
                                break

                            case 1827:
                                if (this.orders[this.count].type === '短租') {
                                    status = '续租款项待确认'
                                    chargebutton = '确认'
                                    chargebuttondisabled = true
                                } else {
                                    status = '续租合同待确认'
                                    chargebutton = '确认'
                                    chargebuttondisabled = true
                                }
                                break
                        }
                        let detailpage = '/detail/' + this.orders[this.count].object.room.roomId
                        console.log(detailpage)
                        this.lists.push({
                            'orderid': this.orders[this.count].object.id,
                            'order': this.orders[this.count].object,
                            'roomid': this.orders[this.count].object.room.roomId,
                            'image': this.orders[this.count].object.room.imageUrls[0],
                            'address': this.orders[this.count].object.room.address,
                            'tenantName': this.orders[this.count].object.tenantName,
                            'status': status,
                            'state': this.orders[this.count].object.state,
                            'renttype': this.orders[this.count].type,
                            'roomtype': this.orders[this.count].object.room.type,
                            'createdtime': this.orders[this.count].object.createdTime,
                            'checkinday': this.orders[this.count].object.checkInDay,
                            'leaveday': this.orders[this.count].object.leaveDay,
                            'detailpage': detailpage,
                            'chargebutton': chargebutton,
                            'chargebuttondisabled': chargebuttondisabled
                        })
                        this.count++
                    }
                    this.loading = false
                }, 500)
                console.log('list')
                console.log(this.lists)
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
                if (type === '短租') {
                    switch (state) {
                        case 1823:
                            let id=order.id
                            this.$axios.post('/api/deleteShortRentOrder?id='+id)
                            alert('订单已删除')
                            lists.splice(index,1)
                            break
                        case 1825:
                            data = {
                                'shortRentOrder': order,
                                'state': 1824
                            }
                            this.$axios.post('/api/setShortRentState', data)
                            alert('订单将等待租客支付')
                            lists.splice(index,1)
                            break
                        case 1827:
                            let id1=order.id
                            this.$axios.post('/api/deleteShortRentOrder?id='+id1)
                            alert('订单已删除')
                            lists.splice(index,1)
                            break
                    }
                } else {
                    switch (state) {
                        case 1823:
                        case 1825:
                        case 1827:
                            let id1=order.id
                            this.$axios.post('/api/deleteLongRentOrder?id='+id1)
                            alert('订单已删除')
                            lists.splice(index,1)
                            break
                    }
                }
            },
            charge(list,lists,index) {
                var type = list.renttype
                var state = list.state
                var order = list.order
                var data
                if (type === '短租') {
                    switch (state) {
                        case 1823:
                            data = {
                                'shortRentOrder': order,
                                'state': 1824
                            }
                            this.$axios.post('/api/setShortRentState', data)
                            alert('审核通过，待租客付款')
                            lists.splice(index,1)
                            break
                        case 1825:
                            data = {
                                'shortRentOrder': order,
                                'state': 1826
                            }
                            this.$axios.post('/api/setShortRentState', data)
                            alert('款项确认，租客入住')
                            lists.splice(index,1)
                            break
                        case 1827:
                            data = {
                                'shortRentOrder': order,
                                'state': 1826,
                                'days': order.days
                            }
                            this.$axios.post('/api/setShortRentRelet', data)
                            alert('租客续租成功')
                            lists.splice(index,1)
                            break
                    }
                } else {
                    switch (state) {
                        case 1823:
                            let data = {
                                'longRentOrder': order,
                                'state': 1825
                            }
                            this.$axios.post('/api/setLongRentState', data)
                            alert('审核通过，待租客签合同')
                            lists.splice(index,1)
                            break
                        case 1825:
                            data = {
                                'longRentOrder': order,
                                'state': 1826
                            }
                            this.$axios.post('/api/setLongRentState', data)
                            alert('合同签订完毕，租客入住')
                            lists.splice(index,1)
                            break
                        case 1827:
                            data = {
                                'longRentOrder': order,
                                'state': 1826,
                                'months': order.months//迟点改成order.months
                            }
                            this.$axios.post('/api/setLongRentRelet', data)
                            alert('租客续租成功')
                            lists.splice(index,1)
                            break
                    }
                }
            }

        }
    }
</script>

<style scoped>
</style>
