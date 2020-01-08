<template>
  <div>
    <div class="commoditylist">
      <router-link class="commodity" v-for="item in phonelist" :key="item.id" :to="'/homepage/phonelist/phoneinfo/'+item.id">
        <div class="commodity-photo">
          <img :src="item.img_url" alt />
        </div>
        <p style="background-color:white">华为(HUAWEI)荣耀6Plus16G双4G版</p>
        <div class="S">
          <p>
            <span style="font-size:1.2em;color:red">￥{{item.sell_price}}</span>
            <span style="font-size:0.8em;text-decoration:line-through">￥{{item.market_price}}</span>
          </p>
          <p>
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </router-link>
      <mt-button type="danger" size="large" plain style="margin-top:10px" @click="getmorephonelist"> 加载更多</mt-button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            pageindex:1,
            phonelist:[]
        }
    },
    created() {
        this.getphonelist()
    },
    methods: {
        getphonelist(){
            this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+ this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.phonelist=result.body.message
                }
            })
        },
        getmorephonelist(){
            this.pageindex++;
              this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+ this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.phonelist=this.phonelist.concat(result.body.message)
                }
            })
            

        }
    },
};
</script>

<style lang="scss">
.commoditylist {
    margin-top: 1px;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
  p {
      color: black;
    margin: 0;
    width: 100%;
    font-size: 0.8em;
  }

  .commodity {
box-shadow: 1px 1px 1px #888888;
    
    width: 49%;
    text-align: center;
    padding:0 2px;
    margin-top: 5px;
    p{
        display: flex;
              justify-content: space-between;
    }

    .commodity-photo {
      width: 100%;
      height: 200px;

      img {
        width: 100%;
        height: 200px;
      }

    }
  }
}
</style>