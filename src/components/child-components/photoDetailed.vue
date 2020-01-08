<template>
  <div class="PDT-container">
    <div class="head">
      <h3>{{pdtlist.title}}</h3>
      <p>
        <span>发表时间：{{pdtlist.add_time|dateFormat}}</span>
        <span>点击：{{pdtlist.click}}次</span>
      </p>
      <hr />
    </div>
 <div class="thumbs">
         <vue-preview :slides="slide1" @close="handleClose" ></vue-preview>
 </div>
    <comment :id='id'></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //获取路由传给子组件的ID
      pdtlist: [],
      slide1:[]
      
    };
  },
  created() {
    this.getImageinfo();
     this.getpdflist()
  },
  methods: {
    getImageinfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.pdtlist = result.body.message[0];
          }
        });
    },
    getpdflist(){
        this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result=>{
            if(result.body.status===0){
                result.body.message.forEach(element => {
                    element.w=600
                    element.h=400
                    element.msrc=element.src                   
                });
                this.slide1=result.body.message
            }
        })
    },
    handleClose () {
        console.log('close event')
      }
  },
  components: {
    comment: comment
  }
};
</script>

<style lang="scss">
.thumbs{
    display: flex;
    flex-direction: row;
    justify-content: center;
    img{
        width: 100px;
        height: 100px
    }

}
.thumbs>div {
    width: 100%
}
.thumbs>div .my-gallery>figure{
    height: 100px;
    width: 100px;
    margin: 0 ;
    display: inline-block;
    margin-left: 15px
}
</style>