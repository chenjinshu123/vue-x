import VueRouter from 'vue-router'//导入路由组件
import homepage from './components/tabbar/homepage.vue'
import vip from './components/tabbar/vip.vue'
import shopping from './components/tabbar/shopping.vue'
import search from './components/tabbar/search.vue'


var router=new VueRouter({
    routes:[
        {path: '/',
        redirect: '/homepage',//设置默认指向的路径
        },{
        path:'/homepage',component:homepage
    },
    {path:'/vip',component:vip},
    {path:'/shopping',component:shopping},
    {path:'/search',component:search}


    ],
    linkActiveClass:'mui-active' //为路由激活时动态添加的类，类名可以自定义
    })

    export default router