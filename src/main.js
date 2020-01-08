import Vue from 'vue'
import App from './APP.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'
import moment from 'moment'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
Vue.use(MintUi);
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(router)
Vue.http.options.emulateJSON=true

Vue.filter('dateFormat',function(dataStr,patten="YYYY-MM-DD HH:MM:SS"){
    return moment(dataStr).format(patten)
})



var vm =new Vue({
    el:"#app",
    render: c =>c(App),
    router
}) 
 console.log('hello')