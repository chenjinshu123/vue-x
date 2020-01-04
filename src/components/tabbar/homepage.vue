<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotu" :key="item.url">
        <img :src="item.img_url" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/homepage/newslist">
		                    <span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
		                    <div class="mui-media-body">Email</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-chatbubble"></span>
		                    <div class="mui-media-body">Chat</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-location"></span>
		                    <div class="mui-media-body">location</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-search"></span>
		                    <div class="mui-media-body">Search</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-phone"></span>
		                    <div class="mui-media-body">Phone</div></a></li>
		        </ul> 
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      lunbotu: []
    };
  },
  created() {
    this.getlunbo()
  },
  methods: {
    getlunbo() {
      this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result => {
        console.log(result)
        if (result.body.status === 0) {
          this.lunbotu=result.body.message
        }else{
          Toast("轮播图获取失败")
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  width: 100%;
  height: 200px;
}
.mint-swipe-item {
  &:nth-child(1) {
    background-color: red;
  }
}
img{
  width: 100%;
  height: 100%
}

</style>