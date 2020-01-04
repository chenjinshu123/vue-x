<template>
  <div class="list"><ul class="mui-table-view">
				<router-link class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id" :to="'/homepage/newsinfo/'+item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<div class="content"><p class='mui-ellipsis'>发表时间：{{item.add_time | dateFormat}}</p><p>点击:{{item.click}}次</p></div>
						</div>
					</a>
				</router-link>		
			</ul>
            
         
            </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
         newslist:[]   
        }
    },
    created() {
        this.getnewslist();
    },
    methods: {
        getnewslist(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then((result)=>{
                if(result.body.status===0){
this.newslist= result.body.message
                }else{
                    Toast('获取json数据失败')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    justify-content: space-between;
    p{
    color: #226aff;
    font-size: 10px
    }
}
.mui-table-view{
    padding: 0 4px;

}
.mui-media-body{
    font-size: 10px;
    color: black
}


</style>