<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
    data () {
        return {
            isRouterAlive: true
        }
    },
    provide () {
        return {
            reload: this.reload
        }
    },
  methods: {
      reload () {
          this.isRouterAlive = false
          this.$nextTick(function() {
              this.isRouterAlive = true
          })
      },
    setCookie: function (cName, value, expire) {
      var date = new Date()
      date.setSeconds(date.getSeconds() + expire)
      document.cookie = cName + '=' + escape(value) + '; expires=' + date.toUTCString()
      console.log(document.cookie)
    },
    getCookie: function (cName) {
      if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(cName + '=')
        if (cStart !== -1) {
          cStart = cStart + cName.length + 1
          let cEnd = document.cookie.indexOf(';', cStart)
          if (cEnd === -1) cEnd = document.cookie.length
          return unescape(document.cookie.substring(cStart, cEnd))
        }
      }
      return ''
    }
  }

}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>
