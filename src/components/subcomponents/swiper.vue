<template>
  <div>
         <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in photolist" :key="item.url">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['photolist']

}
</script>

<style lang='scss'>
.mint-swipe {
  width: 100%;
  height: 200px;
}
img{
    
    height: 100%;
}
.mint-swipe-item{
    text-align: center;
}
</style>