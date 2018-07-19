<template>
  <div class="info" >
    <div class="my">
    <div class="base mtop50">
    <div class="left">
      任务编号：<span class="red">**</span>
    </div>
    <div class="right">
      任务赠品：<span class="red">**</span>
    </div>
    </div>
    <div class="bgcolor tips big">任务自我检验宝贝是否找对</div>
    <div>
      <textarea v-model="txtarea1" />
      <textarea v-model="txtarea2" />
    </div>
   <div class="textcenter">
    <div class="btn-gray" @click="checkTaobaoKey">立即校验</div>
    </div>
     <div class="tips1">提示：自我效验通过，核对下单金额无误，针对参加淘抢购等有付款时间限制产品，可提前付款，并等待系统通知，如系统通知失败，请申请退款，放弃任务，重新接任务。</div>
    <div class="bgcolor mtop50 tips big">请耐心等待付款通知</div>
     <div class="tips1">系统正在核对订单，请等待系统通知付款（10-20分钟左右），休息片刻，再来刷新</div>
   <div class="textcenter">
    <div class="btn">系统审核中</div>
    <div class="btn">审核通过，请完成付款</div>
    </div>
    <p class="tips1">友情提示：</p>
    <p class="tips1">1.付款后，平台会安排发货赠品，收到赠品后，文字评价，不要晒图。</p>
    <p class="tips1">2.确认收货后，系统发红包全额返款</p>
    </div> 
    <div class="bgcolor mtop50 tips big">最后一步：上传订单截图</div>

  <div class="textcenter">
 <div class="upload-block">
    <div class="upload-img">
    <img src="../assets/imgs/upload-icon.png" />
    <img src="../assets/imgs/upload-icon.png" />
  </div>
   <div class="upload-btn">
    <UploadImg text="订单截图" :taskOrderId="taskOrderId" sequence="TaoBaoOrder" />
    <UploadImg text="微信收款码截图" :taskOrderId="taskOrderId" sequence="WechatCode" />
  </div>
</div>
    <div class="btn">点击确认，坐等收货赠品吧!</div></div>
    <div class="bottom-tips">任务完成后，将看到更多其他任务</div>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UploadImg from '@/components/UploadImg.vue';
import { setCheckTBkey } from '@/api/taskfree';

@Component({
  components: { UploadImg }
})
export default class TaskBuy3 extends Vue {
  private taskName = '北极绒女士';
  private txtarea1: string;
  private txtarea2: string;
  private taskOrderId: string;
  private sequence: string;
  private created() {}
  private checkTaobaoKey() {
    setCheckTBkey(this.taskOrderId, this.txtarea1, this.txtarea2)
      .then((res: {}) => {
        this.$toast('成功');
        //数据逻辑处理
      })
      .catch((err: {}) => {
        this.$toast(err);
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
    margin: 20px 40px;
    width: 250px;
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
    color: #333;
    font-size: 24px;
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
  .red {
    color: brown;
    font-weight: bold;
  }
  .btn {
    width: 365px;
  }
  .orderImg {
    width: 300px;
    height: 240px;
    padding: 40px 0;
  }
  .upload-block {
    padding-top: 20px;
    width: 100%;
    text-align: center;
    .upload-img {
      display: inline-block;
      img {
        width: 66px;
        height: 66px;
        padding: 100px;
        display: inherit;
        border: 1px solid #999;
      }
      img:first-child {
        margin-right: 80px;
      }
    }
    .upload {
      margin: 10px 80px;
    }
  }
}
</style>