<template>
  <div class="info" >
    <div class="my">
    <div class="base mtop50">
    <div class="left">
      任务编号：<span class="red">{{initData.task_no}}</span>
    </div>
    <div class="right">
      任务奖励：<span class="red">{{initData.gift}}</span>
    </div>
    </div>
    <div class="bgcolor tips big">完成如下任务</div>
         <div class="copy-block">
    <input v-model="initData.key_word" readonly />
    <div class="btn-hollow copy"  v-clipboard:copy="initData.key_word"
        v-clipboard:success="onCopy"><span class="hollow">点击复制</span></div>
    </div>
     <div class="tips1">复制关键词后，打开手机淘宝搜索关键词，找到下图宝贝，关注宝贝，浏览图和详情</div>
   <img class="longGoodimg" :src="initData.url"  />
    <div class="bgcolor mtop50 tips big">分享宝贝，将淘口令粘贴至下面方框</div>
  <textarea v-model="key"  />
   <div class="textcenter">
    <div class="btn"   @click="commitTaoBaoKey">点击提交</div></div>
    </div> 
    <div class="bottom-tips">挖宝成功，系统将奖励一次挖宝任务</div>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getQuery } from '@/util/cookie';
import { setRefundTaobaoKey, getRefundInfo, RefundInfo } from '@/api/taskrefund';

@Component({
  components: {}
})
export default class TaskFree extends Vue {
  private tid = '';
  private initData: RefundInfo = {
    key_word: '',
    task_order_id: '',
    status: '',
    task_no: '',
    gift: '',
    url: ''
  };
  private key = '';
  private created() {
    this.tid = getQuery('tid');
    getRefundInfo(this.tid)
      .then((res:RefundInfo) => {
        this.initData = res;
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
        this.initData.key_word = '111';
        this.initData.task_order_id = '222';
        this.initData.status = '3';
        this.initData.task_no = '444';
        this.initData.gift = '555';
        this.initData.url = '666';
      });
  }
  private onCopy() {
    this.$toast('复制成功');
  }
  private commitTaoBaoKey() {
    setRefundTaobaoKey(this.initData.task_order_id, this.key)
      .then((res: {}) => {
        this.$toast('淘口令提交成功');
        //数据逻辑处理
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.info {
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
    position: relative;
    height: 80px;
    .left {
      display: inline-block;
      position: absolute;
      left: 0;
    }
    .right {
      display: inline-block;
      position: absolute;
      right: 0;
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
}
</style>