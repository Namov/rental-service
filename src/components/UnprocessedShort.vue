<template>
  <div>
    <h2 style="padding-left: 10px; text-align: left">短租订单处理</h2>
    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul
        class="list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="list-style-type: none;padding-inline-start: 0px">
        <li v-for="(list) in lists" v-bind:key="list.id">
          <div class="orderShow">
            <el-row>
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src=list.image class="image">
                <div class="label">
                  <div style="padding: 5px">
                    <el-link :underline="false" style="font-size: 16px" :href=list.detailpage target="_blank">{{list.address}}（{{list.status}}）</el-link>
                    <time class="time">{{list.createdtime}}</time>
                  </div>
                  <div class="position">{{list.roomtype}}&nbsp;&nbsp;{{list.renttype}}</div>
                  <div class="buttongroup">
                    <el-button class="button" type="primary" @click="view(list.orderid)">查看</el-button>
                    <el-button class="button" type="success" plain @click="charge(list.orderid)" :disabled=list.chargebuttondisabled>{{list.chargebutton}}</el-button>
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
    <el-dialog
      title="提示"
      :visible.sync="viewDialogVisible"
      width="30%">
      <span>test</span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "UnprocessedShort"
    }
</script>

<style scoped>

</style>
