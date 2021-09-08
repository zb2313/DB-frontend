<template>
<div>
 <el-button @click="getPic">图片</el-button><br>
  <div><img :src="pic"></div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "SellerPost",
  data()
  {
    return{
      pic:"http://www.example.com/image.gif",
    }
  },
  methods:
  {
    getPic()
    {
      axios.get("http://49.234.18.247:8080/api/HotelLicense/0000000001")
      .then(
          (response)=>
          {
            this.pic=response.data;
          }
      )
    }
  },
  created() {
    axios.get("http://49.234.18.247:8080/api/HotelLicense/0000000001")
        .then(
            (response)=>
            {
              this.pic=response.data;
            }
        )
  }
}
</script>

<style scoped>

</style>
