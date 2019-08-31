<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <nav-bar/>
      </el-header>
      <el-container style="padding-top: 3px">
        <el-aside width="200px">
          <Service-menu/>
        </el-aside>
        <el-main style="height: inherit">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-main {
    padding: 5px;
  }

  body {
    margin: 0;
  }
</style>

<script>
import NavBar from '../../components/NavBar'
import ServiceMenu from '../../components/ServiceMenu'
import ManageTenant from '../../components/ManageTenant'

export default {
  components: {ManageTenant, NavBar, ServiceMenu},
  data () {
    return {
      name: '',
      showRent: 'true'
    }
  },
  mounted () {
    this.$router.push('/manageTenant')
  },
  methods: {}
}
</script>
