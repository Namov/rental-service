<template>
    <el-menu class="el-menu-demo" mode="horizontal" :default-active="activeIndex" @select="handleSelect">
      <el-link :underline="false" id="header"><h1>青年租房</h1></el-link>
    </el-menu>
</template>

<style>
  #header {
    float: left;
    color: #3399ff;
    padding-left: 20px;
    padding-right: 20px;
  }

  #name {
    float: right;
    width: auto;
  }

  .el-header {
    padding: 0;
  }

</style>

<script>

export default {
  data () {
    return {
      name: 'NavBar',
      activeIndex: '2-2'
    }
  },
  mounted () {
      this.$router.push('/')
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    quit () {
      this.$router.push('/')
    },
    showProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>
