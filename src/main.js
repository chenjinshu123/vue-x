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
import Vuex from 'vuex'
import "./lib/mui/js/mui.min.js"
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(Vuex)
Vue.use(VuePreview)
Vue.use(MintUi);
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(router)
Vue.use(ElementUI)


Vue.http.options.emulateJSON = true
Vue.filter('dateFormat', function (dataStr, patten = "YYYY-MM-DD HH:MM:SS") {
    return moment(dataStr).format(patten)
})


var car = JSON.parse(localStorage.getItem('car') || '[]')//这一步实在页面刚加载的时候先获取浏览器自带的存储空间里的数据，
// 再用json.parse将json格式的数据转化为一个js可以识别的数组

var store = new Vuex.Store({
    state: {
        car: car,
        numbers: 0//将购物车中的商品的数据，用一个数组存储起来

    },//this.$store.state.XX
    mutations: {
        atc(state, goodsinfo) {
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(item.count) + parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }

            localStorage.setItem('car', JSON.stringify(state.car)) //当更新完car之后，把car这个数组，存储到浏览器自带的存储空间localStorage中
        },
        removefromcar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updataGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }


    },//this.$store.commit('方法的名称','按需传递唯一的参数，如果要传入多个参数可以把参数塞到数组')
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(element => {
                c += parseInt(element.count)
            });
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o

        },
        getGoodsCountAndAmount(state){
            var o= {
                count:0, //勾选的数量
                amount:0 //勾选的总价
            }
            state.car.forEach(item=>{
                if (item.selected){
                    o.count +=parseInt(item.count)
                    o.amount+=parseInt(item.count)* item.price
                }
               
            })
            return o
        }



    }//this.$store.getters.XX
})













var vm = new Vue({
    el: "#app",
    render: c => c(App),
    router,
    store //挂载 store 状态管理对象
})
console.log('hello')