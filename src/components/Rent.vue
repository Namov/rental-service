<template>
  <div class="rent-wrap">
    <div style="text-align: left">
      <el-radio-group v-model="typeRadio" border="true" size=50%>
        <el-radio-button label="短租" @click.native="findShortRent()"></el-radio-button>
        <el-radio-button label="长租" @click.native="findLongRent()"></el-radio-button>
      </el-radio-group>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="单人间">
<!--        <div v-for="room1 in rooms" :key="room1">-->
<!--          <Room :room="room1"></Room>-->
<!--        </div>-->
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            style="list-style: none"
          >
            <li v-for="room1 in this.rooms" :key="room1"
                style="list-style: none"
            >
              <Room v-if="room1.type==='单人间'" :room="room1" @click.native="room0(room1)"></Room>
              <el-dialog  title="请填写短租申请信息" :visible.sync="SdialogFormVisible1">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="RentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="租住时间" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="dates"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="下午入住"
                      end-placeholder="上午离开"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible1 = false">取 消</el-button>
                  <el-button type="primary" @click="commitShortRent()">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog  title="请填写长租申请信息" :visible.sync="SdialogFormVisible4">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="RentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                  <div class="block">
                    <span class="demonstration">选择入住时间</span>
                    <el-date-picker
                      v-model="ldate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </div>
                  <el-row>
                    <br>
                    <br>
                    <el-col>选择租住月数</el-col>
                    <br>
                    <el-col><el-input-number v-model="month_num" :min="1" :max="240" placeholder="租住月数"></el-input-number></el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible4 = false">取 消</el-button>
                  <el-button type="primary" @click="commitLongRent()">确 定</el-button>
                </div>
              </el-dialog>
            </li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="双人间">
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            style="list-style: none"
          >
            <li v-for="room1 in this.rooms" :key="room1"
                style="list-style: none"
            >
              <Room v-if="room1.type==='双人间'" :room="room1" @click.native="room2(room1)"></Room>
              <el-dialog title="请填写短租申请信息" :visible.sync="SdialogFormVisible2">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="RentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="租住时间" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="dates"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="下午入住"
                      end-placeholder="上午离开"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="commitShortRent()">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog  title="请填写长租申请信息" :visible.sync="SdialogFormVisible5">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="RentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible5 = false">取 消</el-button>
                  <el-button type="primary" @click="commitLongRent()">确 定</el-button>
                </div>
              </el-dialog>
            </li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="四人间">
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            style="list-style: none"
          >
            <li v-for="room1 in this.rooms" :key="room1"
                style="list-style: none"
            >
              <Room v-if="room1.type==='四人间'" :room="room1" @click.native="room3(room1)"></Room>
              <el-dialog title="请填写短租申请信息" :visible.sync="SdialogFormVisible3">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="RentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="租住时间" :label-width="formLabelWidth">
                    <el-date-picker
                      v-model="dates"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="下午入住"
                      end-placeholder="上午离开"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible3 = false">取 消</el-button>
                  <el-button type="primary" @click="commitShortRent()">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog  title="请填写长租申请信息" :visible.sync="SdialogFormVisible6">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="username" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证" :label-width="formLabelWidth">
                    <el-input v-model="RentOrder.tenantId" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="房源" :label-width="formLabelWidth">
                    <el-input
                      placeholder="房源地址"
                      v-model="rent_room.address"
                      :disabled="true">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="SdialogFormVisible6 = false">取 消</el-button>
                  <el-button type="primary" @click="commitLongRent()">确 定</el-button>
                </div>
              </el-dialog>
            </li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Room from './Room'
import {getCookie} from '../assets/js/cookie'
export default {
  name: 'Rent',
  components: {Room},
  data () {
    return {
      month_num: 1,
      rent_room: {},
      RentOrder: {
        'checkInDay': '',
        'leaveDay': '',
        'tenantName': '',
        'tenantId': '',
        'state': 1823,
        'room': ''
      },
      username: '',
      // dialogRoomAddress: '',
      dates: [],
      ldate: '',
      typeRadio: '短租',
      rooms: null,
      loading: false,
      count: 0,
      SdialogFormVisible1: false,
      SdialogFormVisible2: false,
      SdialogFormVisible3: false,
      SdialogFormVisible4: false,
      SdialogFormVisible5: false,
      SdialogFormVisible6: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    noMore () {
      return this.count > this.rooms.length + 4
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  mounted () {
    this.username = getCookie('username')
    // var self = this
    // this.$axios.get('/api/room/findAll', {withCredentials: true}).then(function (res) {
    //   console.log(res.data)
    //   self.rooms = res.data
    //   self.count = res.data.length
    // }
    this.findShortRent()
  },
  methods: {
    room0 (r) {
      this.rent_room = r
      if (this.typeRadio === '短租') {
        this.SdialogFormVisible1 = true
      } else {
        this.SdialogFormVisible4 = true
      }
    },
    room2 (r) {
      this.rent_room = r
      if (this.typeRadio === '短租') {
        this.SdialogFormVisible2 = true
      } else {
        this.SdialogFormVisible5 = true
      }
    },
    room3 (r) {
      this.rent_room = r
      if (this.typeRadio === '短租') {
        this.SdialogFormVisible3 = true
      } else {
        this.SdialogFormVisible6 = true
      }
    },
    findShortRent () {
      var self = this
      var data = {'rentType': '2005'}
      this.$axios.post('/api/room/findByRentType', data, {withCredentials: true}).then(function (res) { //, {withCredentials: true}
        console.log(res.data)
        self.rooms = res.data
        self.count = res.data.length
      })
    },
    findLongRent () {
      var self = this
      var data = {'rentType': '2004'}
      this.$axios.post('/api/room/findByRentType', data, {withCredentials: true}).then(function (res) { //, {withCredentials: true}
        console.log(res.data)
        self.rooms = res.data
        self.count = res.data.length
      })
    },
    commitShortRent () {
      this.SdialogFormVisible1 = false
      this.SdialogFormVisible2 = false
      this.SdialogFormVisible3 = false
      // eslint-disable-next-line no-unused-vars
      var order = this.RentOrder
      order.tenantName = this.username
      // eslint-disable-next-line no-undef
      order.checkInDay = this.dates[0]
      // eslint-disable-next-line no-undef
      order.leaveDay = this.dates[1]
      order.room = this.rent_room
      console.log(order)
      this.$axios.post('/api/shortRentEnroll', order)
      alert('订单提交成功，请等待审核')
    },
    commitLongRent () {
      this.SdialogFormVisible4 = false
      this.SdialogFormVisible5 = false
      this.SdialogFormVisible6 = false
      // eslint-disable-next-line no-unused-vars
      var order = this.RentOrder
      order.tenantName = this.username
      // eslint-disable-next-line no-undef
      order.checkInDay = this.ldate
      // eslint-disable-next-line no-undef
      order.leaveDay = this.ldate
      order.room = this.rent_room
      console.log(order)
      var data = {'longRentOrder': order, 'months': this.month_num}
      this.$axios.post('/api/longRentEnroll', data)
      alert('订单提交成功，请等待审核')
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style>
</style>
