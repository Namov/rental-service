<template>
  <el-container>
    <el-header style="padding: 0px">
      <p
        style="margin: 0px; padding-top: 18px;padding-left: 20px;padding-right: 20px;text-align: left;font-size: 21px;font-weight: 700">
        房屋详情</p>
    </el-header>
    <el-main>
      <div style="margin: 20px;height: inherit">
        <div style="display: inline-block;width: fit-content">
          <el-carousel trigger="click" height="450px" indicator-position="none" :autoplay="false" :loop="false"
                       style="width: 600px;vertical-align: top">
            <el-carousel-item v-for="item in image" :key="item">
              <img :src=item style="width: 100%">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div
          style="display: inline-block;text-align: left;width: fit-content;max-width: 30%;padding-left: 50px;vertical-align: top">
          <h1>{{this.data.address}}</h1>
          <p>状态：{{this.data.state}}</p>
          <p>人数：{{this.data.type}}</p>
          <p>出租类型：{{this.data.renttype}}</p>
          <p>面积：{{this.data.area}} 平方米</p>
          <p>价格：{{this.data.price}}</p>
          <p>房主：{{this.data.landlord}}</p>
          <p>联系方式：{{this.data.phone}}</p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      data: {},
      image: []
    }
  },
  mounted () {
    // get detail here
    let self = this
    this.$axios.get('/api/room/findById?id=' + this.$route.params.id).then((res) => {
      console.log(res)
      if (res.data === '') {
        self.$route.push('/')
      } else {
        let state = ''
        switch (res.data.state) {
          case 2001:
            state = '已租'
            break
          case 2002:
            state = '未租'
            break
        }
        let renttype = ''
        let price = ''
        switch (res.data.rentType) {
          case 2004:
            renttype = '长租'
            price = res.data.priceForMonth.toString() + '/月'
            break
          case 2005:
            renttype = '短租'
            price = res.data.priceForDay.toString() + '/天'
            break
          case 2006:
            renttype = '长租 / 短租'
            price = '长租 ' + res.data.priceForMonth.toString() + '/月，短租 ' + res.data.priceForDay.toString() + '/天'
            break
        }
        self.data = {
          'address': res.data.address,
          'state': state,
          'type': res.data.type,
          'renttype': renttype,
          'area': res.data.area,
          'price': price,
          'landlord': res.data.landLord.username,
          'phone': res.data.landLord.phone
        }
        self.image = res.data.imageUrls
      }
    })
  }
}
</script>

<style>
  body {
    margin: 0;
  }
</style>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
