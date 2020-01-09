<template>
  <div class="App-contain">
    <mt-header class="header" fixed title="Text-Firstpage">
       <span @click="goback" slot="left" v-show="flag">
    <mt-button icon="back">返回</mt-button>
       </span>
    </mt-header>

    <transition>
        <router-view></router-view>
    </transition>




    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-cjs" to="/homepage">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-cjs" to="/vip">
        <span class="mui-icon mui-icon-email">
        </span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-cjs" to="/shopping">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}} </span>
        </span>
        <span class="mui-tab-label" >购物车</span>
      </router-link>
      <router-link class="mui-tab-item-cjs" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default{
  data() {
    return {
     flag:false
    }
  },
  created() {
    this.flag = this.$route.path ==='/homepage'?false : true;
  },
  methods: {
     goback(){
      this.$router.go(-1)
    }

  },
  watch: {
    '$route.path':function(a){
      if(a==="/homepage"){
        this.flag=false
      }else{
        this.flag=true
      }
    }
  },

  
}
</script>

<style lang="scss" scoped>
.header {
  background-color: black;
}
.App-contain {
  padding-top: 40px;
  overflow: hidden;
  padding-bottom: 50PX
}


.v-enter{
   opacity: 0;
  transform: translateX(100%);
  
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute
}

.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}

.mui-bar-tab .mui-tab-item-cjs.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-cjs {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-cjs .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mui-bar-tab .mui-tab-item-cjs .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
</style>