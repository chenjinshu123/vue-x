import Vue from 'vue'
import App from './APP.vue'
import { Header,Swipe, SwipeItem } from 'mint-ui';
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.use(router)



Vue.component(Header.name, Header);

var vm =new Vue({
    el:"#app",
    render: c =>c(App),
    router
}) 
 console.log('hello')