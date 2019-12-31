import Vue from 'vue'
import App from './APP.vue'
import { Header } from 'mint-ui';
import './lib/mui/css/mui.min.css'

Vue.component(Header.name, Header);

var vm =new Vue({
    el:"#app",
    render: c =>c(App)
}) 
 console.log('hello')