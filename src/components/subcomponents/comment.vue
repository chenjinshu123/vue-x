<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入您要发表的评论" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" class="push" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in commentslist" :key="i">
        <div
          class="cmt-title"
        >{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content==='undefined' ? '此用户很懒，什么也没说':item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getmorecomment">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      commentslist: [],
      msg: "" //评论输入的内容
    };
  },
  created() {
    this.getcomment();
  },
  methods: {
    getcomment() {
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/getcomments/" +
            this.id +
            "?pageindex=" +
            this.pageindex
        )
        .then(result => {
          if (result.body.status === 0) {
            this.commentslist = this.commentslist.concat(result.body.message);
          } else {
            Toast("获取评论数据失败");
          }
        });
    },
    getmorecomment() {
      this.pageindex++;
      this.getcomment();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空");
      }
      this.$http
        .post(
          "http://www.liulongbin.top:3005/api/postcomment/" +
            this.$route.params.id,
          { content: this.msg.trim() }
        )
        .then(result => {
          if (result.body.status === 0) {
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.commentslist.unshift(cmt)
            this.msg=''
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss">
.cmt-container {
  h3 {
    font-size: 18px;
  }
  .push {
    margin-top: -15px;
  }
  .cmt-item {
    .cmt-title {
      background-color: #ccc;
      font-size: 10px;
    }
    .cmt-body {
      text-indent: 2em;
    }
  }
}
</style>