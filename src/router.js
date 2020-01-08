import VueRouter from 'vue-router'//导入路由组件
import homepage from './components/tabbar/homepage.vue'
import vip from './components/tabbar/vip.vue'
import shopping from './components/tabbar/shopping.vue'
import search from './components/tabbar/search.vue'
import newslist from './components/child-components/newslist.vue'
import newsinfo from './components/child-components/newsinfo.vue'
import photoslist from './components/child-components/photoslist.vue'
import photoDetailed from './components/child-components/photoDetailed.vue'
import phonelist from './components/child-components/phonelist.vue'
import phoneinfo from './components/child-components/phoneinfo.vue'

var router=new VueRouter({
    routes:[
        {path: '/',
        redirect: '/homepage',//设置默认指向的路径
        },{
        path:'/homepage',component:homepage
    },
    {path:'/vip',component:vip},
    {path:'/shopping',component:shopping},
    {path:'/search',component:search},
    {path:'/homepage/newslist',component:newslist},
    {path:'/homepage/newsinfo/:id',component:newsinfo},
    {path:'/homepage/photoslist',component:photoslist},
    {path:'/homepage/photoslist/photoinfo/:id',component:photoDetailed},
    {path:'/homepage/phonelist',component:phonelist},
    {path:'/homepage/phonelist/phoneinfo/:id',component:phoneinfo}


    ],
    linkActiveClass:'mui-active' //为路由激活时动态添加的类，类名可以自定义
    })

    export default router