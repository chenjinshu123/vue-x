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
            <button type="button" @click="jian">-</button>
            <input type="number" value="1" ref="numbox" style="width:60px;height:33.2px" />
            <button type="button" @click="jia">+</button>
          </span>
          <P style="margin-top:5px;">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
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
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      phoneinfo: {},
      ballFlag: false,
      shoppingnum: 1,
      a: 1
    };
  },
  mounted() {},
  created() {
    this.getlunbotuphoto(this.id), this.getinfo(this.id);
  },
  methods: {
    jia() {
      //购物车+按钮
      if (this.$refs.numbox.value < this.phoneinfo.stock_quantity) {
        this.$refs.numbox.value++;
        this.a = this.$refs.numbox.value;
        console.log(this.a);
      } else {
        return;
      }
    },

    jian() {
      //购物车 - 按钮
      if (this.$refs.numbox.value > 0) {
        this.$refs.numbox.value--;
        this.a = this.$refs.numbox.value;
      } else {
        return;
      }
      console.log(this.a);
    },
    getlunbotuphoto(id) {
      // 这是获取轮播图API数据
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
      //获取商品参数 API数据
      this.$http
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + id)
        .then(result => {
          if (result.body.status === 0) {
            this.phoneinfo = result.body.message[0];
          }
        });
    },
    addToCar() {
      //添加到购物的小球动画效果
      this.ballFlag = !this.ballFlag;
      var goodsinfo = {
        id: this.id,
        count: this.a,
        price: this.phoneinfo.sell_price,
        selected: true
      }; //拼接出一个要保存到store中car数组里的 商品信息对象
      //selected属性为是否需要购买的switch
 
      this.$store.commit('atc',goodsinfo)
    },

    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //小球动画优化思路
      const ballposition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballposition.left;
      const yDist = badgePosition.top - ballposition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s ease";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    } //上面四个函数是实现小球添加到购物车的动画效果
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
