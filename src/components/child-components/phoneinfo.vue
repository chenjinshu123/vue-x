<template>
  <div>
    <!-- 添加购物车时跳动的小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :photolist="lunbotu"></swiper>
      </div>
    </div>

    <!-- 购物添加区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{phoneinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <P>
            市场价：
            <span style="text-decoration:line-through">￥{{phoneinfo.market_price}}</span>
            <span style="color:red;">销售价：{{phoneinfo.sell_price}}</span>
          </P>
          <span>
            购买数量:
            <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9" >
              <button class="mui-btn mui-btn-numbox-minus" type="button"  @click="ppp">-</button>
              <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" />
              <button class="mui-btn mui-btn-numbox-plus" type="button" @click="ppp" >+</button>
            </div>
          </span>
          <P style="margin-top:5px;">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="ballsport">加入购物车</mt-button>
          </P>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{phoneinfo.goods_no}}</p>
          <p>库存情况：{{phoneinfo.stock_quantity}}</p>
          <p>上架时间：{{phoneinfo.add_time| dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer"></div>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      phoneinfo: {},
      ballFlag: false,
      shoppingnum:1,
      a:1
    };
  },
  mounted() {
    mui("mui-numbox").numbox();
  },
  created() {
    this.getlunbotuphoto(this.id), this.getinfo(this.id);
  },
  methods: {
      ppp(){
          console.log(this.$refs.numbox.value)
          this.a=this.$refs.numbox.value
      },
      countChanged(){
          this.shoppingnum=this.$refs.numbox.value
          console.log(this.shoppingnum)
      },
    getlunbotuphoto(id) {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + id)
        .then(result => {
          if (result.body.status === 0) {
            this.lunbotu = result.body.message;
            this.lunbotu.forEach(element => {
              element.img_url = element.src;
            });
          }
        });
    },
    getinfo(id) {
      this.$http
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + id)
        .then(result => {
          if (result.body.status === 0) {
            this.phoneinfo = result.body.message[0];
          }
        });
    },
    ballsport() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //小球动画优化思路
      const ballposition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left-ballposition.left;
      const yDist = badgePosition.top-ballposition.top;







      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s ease";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang='scss' >
.ball {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 99;
  top: 375px;
  left: 140px;
}
</style>
