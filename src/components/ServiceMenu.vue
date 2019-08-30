<template>
  <el-row class="tac" style="height: 100%">
    <el-col :span="12">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        unique-opened=true
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1" v-on:click="showManageTenant">
          <i class="el-icon-user"></i>
          <span slot="title">管理租客</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span>管理房间</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" v-on:click="showAvailable">可用房源</el-menu-item>
            <el-menu-item index="2-2" v-on:click="showUnavailable">暂停出租房源</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3" v-on:click="showManageContract">
          <i class="el-icon-files"></i>
          <span slot="title">管理合同</span>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>管理订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" v-on:click="showProcessed">已处理</el-menu-item>
            <el-menu-item index="5-2" v-on:click="showUnprocessed">待处理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>管理工单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" v-on:click="showArrangeMaster">安排师傅</el-menu-item>
            <el-menu-item index="4-2" v-on:click="showReplyComplaint">回复投诉</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style>
  .el-col-12 {
    width: 100%;
    text-align: left;
    height: 100%;
  }

  html, body, .el-container, .el-menu-vertical-demo {
    height: 100%;
  }

</style>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    showManageTenant () {
      this.$router.push('/manageTenant')
    },
    showAvailable () {
      this.$router.push('/available')
    },
    showUnavailable () {
      this.$router.push('/unavailable')
    },
    showManageContract () {
      this.$router.push('/manageContract')
    },
    showArrangeMaster () {
      this.$router.push('/arrangeMaster')
    },
    showReplyComplaint () {
      this.$router.push('/replyComplaint')
    },
    showProcessed () {
      this.$router.push('/processed')
    },
    showUnprocessed () {
      this.$router.push('/unprocessed')
    }
  }
}
</script>
