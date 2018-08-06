<template>
  <div class="refund">
    <div class="my">
      <div class="base">
        <p class="tips1">
          活动编号：
          <span class="red">{{initData.task_no}}</span>
        </p>
        <p class="tips1">
          活动奖励：
          <span class="red">{{initData.gift}}</span>
        </p>
      </div>
      <div class="bgcolor tips big">完成如下活动</div>
      <div class="copy-block">
        <input v-model="initData.key_word" readonly />
        <div class="btn-hollow copy" v-clipboard:copy="initData.key_word" v-clipboard:success="onCopy">
          <span class="hollow">点击复制</span>
        </div>
      </div>
      <div class="tips1">复制关键词后，打开手机淘宝搜索关键词，找到下图宝贝，关注宝贝，浏览图和详情</div>
     <div class="upload-block">
     <div class="upload-img">
          <img :src="initData.url" />
          <img :src="initData.square_url" />
        </div>
        </div>
      <!-- <img class="longGoodimg" :src="initData.url" /> -->
      <div class="bgcolor mtop50 tips big">分享宝贝，将淘口令粘贴至下面方框</div>
      <textarea v-model="key"  />
      <div class="textcenter">
        <div class="btn" @click="commitTaoBaoKey">点击提交</div>
      </div>
    </div>
      <div class="tips1">提示：提交后，系统会返款结果，提示挖宝成功是否。挖宝失败，请认真再找宝贝，重新分享并提交。</div>
    <div class="bottom-tips">挖宝成功，系统将奖励一次挖宝活动</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getQuery } from "@/util/cookie";
import {
  setRefundTaobaoKey,
  getRefundInfo,
  RefundInfo
} from "@/api/taskrefund";
import { getCreateTask } from "@/api/task";

@Component({
  components: {}
})
export default class TaskFree extends Vue {
  private tid = "";
  private initData: RefundInfo = {
    key_word: "",
    task_order_id: "",
    status: "",
    task_no: "",
    gift: "",
    url: "",
    square_url: ""
  };
  private key = "";
  private created() {
    getCreateTask("refund", getQuery("tid"))
      .then((res: any) => {
        //数据逻辑处理
        this.initData = res;
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
  private onCopy() {
    this.$toast("复制成功");
  }
  private commitTaoBaoKey() {
    setRefundTaobaoKey(this.initData.task_order_id, this.key)
      .then((res: {}) => {
        this.$toast("淘口令提交成功");
        //数据逻辑处理
        setTimeout(() => {
          window.location.href = "/tasklist?type=refund";
        }, 3000);
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/theme.scss";
@import "../scss/_px2px.scss";
.refund {
  font-size: 28px;
  padding: 0 20px;
  textarea {
    border: 1px solid #999;
    margin-top: 20px;
    width: 710px;
    height: 100px;
    font-size: 28px;
  }
  .base {
    padding: 20px 0 30px;
    line-height: 1.5;
    .red {
      width: 500px;
    }
  }
  .tips {
    margin: 10px auto;
    line-height: 38px;
    margin: 0 -20px;
    text-align: center;
  }
  .tips1 {
    margin: 10px auto;
    line-height: 38px;
  }
  .big {
    font-size: 34px;
  }
  .copy-block {
    height: 100px;
    position: relative;
    input {
      position: absolute;
      left: 160px;
    }
    .copy {
      top: 5px;
      position: absolute;
      left: 0;
    }
  }
  .mtop50 {
    margin-top: 50px;
  }

  .bottom {
    text-align: center;
    font-size: 32px;
    position: absolute;
    left: 0;
    right: 0;
    color: #999;
    background-color: #f4f4f8;
    height: 56px;
    padding-top: 20px;
  }
  .upload-block {
    width: 100%;
    padding: 50px 0;
    text-align: center;
    .upload-img {
      display: inline-block;
      img {
        width: 295px;
        // height: 266px;
        // padding: 100px;
        display: inherit;
        border: 1px solid #999;
      }
      img:first-child {
        margin-right: 80px;
      }
    }
  }
}
</style>