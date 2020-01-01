<template>
  <div class="App-contain">
    <mt-header class="header" fixed title="Text-Firstpage"></mt-header>

    <transition>
        <router-view></router-view>
    </transition>




    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/homepage">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/vip">
        <span class="mui-icon mui-icon-email">
        </span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopping">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0 </span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.header {
  background-color: red;
}
.App-contain {
  padding-top: 40px;
  overflow-x: hidden;
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
</style>