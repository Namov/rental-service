<template>
  <div>
    <h2 style="padding-left: 10px; text-align: left">管理合同</h2>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="contract in contracts" class="infinite-list-item">

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ManageContract',
    data () {
        return {
            contracts:[],
            count: 0,
            total:0
        }
    },
    mounted(){
      var self=this
      this.$axios.get('/api/file/getAllContract').then((res)=>{
          self.contracts=res.data
          self.total=self.contracts.length
      })
    },
    methods: {
        load () {
            if(this.count<this.total+3)
            this.count += 2
        }
    }
}
</script>

<style scoped>

</style>

