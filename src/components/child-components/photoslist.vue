<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
      <!-- 顶部滑动条 -->
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id == 0 ? 'mui-active':'']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in cates"
            :key="item.id"
            @tap="getimageslist(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片显示区域 -->
<ul>
  <router-link v-for="item in list" :key="item.channel_id" class="li-cjs" :to="'/homepage/photoslist/photoinfo/'+item.id" tag="li">
    <img v-lazy="item.img_url" class="img-cjs">
    <p class="p-cjs">
        <span class="span-cjs">{{item.zhaiyao}}</span>

    </p>
  </router-link>
</ul>




  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";


export default {
  data() {
    return {
      cates: [],
      list:[]
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.005
    });
  },
  created() {
    this.getAllCategory();
    this.getimageslist(0)
  },
  methods: {
    getAllCategory() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimgcategory")
        .then(result => {
          if (result.body.status === 0) {
            result.body.message.unshift({ title: "全部", id: 0 });
            this.cates = result.body.message;
          }
        });
    },
    getimageslist(id){
        this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+id).then(result=>{
            if(result.body.status===0){
                this.list=result.body.message
            }
        })
    }
  }
};
</script>

<style lang="scss" >
* {
  touch-action: pan-y;
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
ul,li{ padding:0;margin:0;list-style:none}
.li-cjs{
    text-align: center;
    width: 100%;
    position: relative;
    
    .p-cjs{
    position: absolute;
    bottom: 0;
    background-color: rgba(95, 56, 56, 0.5);
    overflow: hidden;
    color: aliceblue;
    vertical-align: bottom;
    }

    
    width: 100%;
    .span-cjs{width: 100%;
    display: inline-block;
}
.img-cjs{
    width: 100%;


    
}
}

</style>