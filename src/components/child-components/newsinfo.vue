<template>
  <div class="list">
<div class="head">
    <p style="color: red;">{{newsinfolist.title}}</p>
    <p class="head-p2" style="color:#226aff"><span>发表时间：{{newsinfolist.add_time | dateFormat }}</span>
    <span>点击次数:{{newsinfolist.click}}</span>
    </p>
</div>
<p>------------------------------------------------------------------</p>
<div class="content" v-html="newsinfolist.content"></div>
   <!-- 评论区组件 -->
            <comment-box :id='this.id'></comment-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
             id:this.$route.params.id,
             newsinfolist:{}
        }
    },
    created() {
        this.getnewsinfo()
        
    },
    methods: {
        getnewsinfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result=>{
                if(result.body.status===0){
                     this.newsinfolist= result.body.message[0]
                }else{
                         Toast('获取信息失败')
                }
            })
        }
        
    },
    components:{
        'comment-box':comment
    }


}
</script>

<style lang="scss">
.list{
    padding: 0 4px
}
.head{
    
    text-align: center;

.head-p2{
display: flex;
justify-content: space-between
}
}

</style>