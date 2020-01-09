<template>
  <div>
    <!-- 购物车商品列表 -->
    <div class="shoplist">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner" style="display:flex;">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt style="width:50px;height:60px" />
            <div class="info">
              <h3 style="font-size:12px">{{item.title}}</h3>
              <p>
                <span class="price" style="color:red">￥{{item.sell_price}}</span>
                <span>
                 
                
                  <input type="number" :value="$store.getters.getGoodsCount[item.id]" ref="numbox" style="width:50px;height:33.2px;font-size:10px" />
           
                </span>
                <a href @click.prevent="remove(item.id,i)">       删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品结算区域 -->
<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan" >
					<div>
            <p>总计（不含运费）</p>
            <p>已勾选商品<span style="color:red;font-size:20px">{{$store.getters.getGoodsCountAndAmount.count}}</span>
              共计总价<span style="color:red;font-size:20px" >{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
              <mt-button type="primary" size="small">立即购买</mt-button>
					</div>
				</div>
			</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist:[]
    };
  },
  created() {
    this.getgoodslist()
  },
  methods: {
    jia() {
      //购物车+按钮
      if (this.$refs.numbox.value < 300) {
        this.$refs.numbox.value++;
        this.a = this.$refs.numbox.value;
        console.log(this.a);
      } else {
        return;
      }
    },

    jian() {
      //购物车 - 按钮
      if (this.$refs.numbox.value > 0) {
        this.$refs.numbox.value--;
        this.a = this.$refs.numbox.value;
      } else {
        return;
      }
      console.log(this.a);
    },
    getgoodslist(){
      var idArr=[];
      this.$store.state.car.forEach(element => {idArr.push(element.id)
        
      });
      if(idArr.length ==0){
        return
      }
       this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
         if(result.body.status===0){
            this.goodslist=result.body.message
         }
        
       })
    },
    remove(id,index){
      this.goodslist.splice(index,1)
   this.$store.commit('removefromcar',id)
    },
    selectedChanged(id,val){
      //每当点击开关，把最新的开关状态同步到store中，
      this.$store.commit('updataGoodsSelected',{id,selected:val})

    }

  }
};
</script>

<style lang="scss">
.jiesuan{
  display: flex ;
  justify-content: space-between
}
</style>