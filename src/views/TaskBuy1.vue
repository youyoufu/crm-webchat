<template>
  <div class="info" >
    <div class="base mtop50">
    <div class="left">
      任务编号：<span class="red">{{initData.task_no}}</span>
    </div>
    <div class="right">
      任务赠品：<span class="red">{{initData.gift}}</span>
    </div>
    </div>
        <div class="bgcolor tips big">完成账户验证后进入任务介绍</div>
     <div class="tips1">复制下面淘口令，打开手机淘宝，按说明截图</div>
   <div class="copy-block">
    <input v-model="initData.taobao_key" readonly  />
    <div class="btn-hollow copy"   v-clipboard:copy="initData.taobao_key"
        v-clipboard:success="onCopy"><span class="hollow">立刻点击复制</span></div>
    </div>
<div class="upload-block">
    <div class="upload-img">
    <img v-if="initData.taobao_key_url" :src="initData.taobao_key_url" />
    <img v-else src="../assets/imgs/upload-icon.png" />
       <img v-if="initData.taobao_key_url1" :src="initData.taobao_key_url1" />
    <img v-else src="../assets/imgs/upload-icon.png" />
  </div>
   <div class="upload-btn">
    <UploadImg text="上传截图1" :taskOrderId="initData.task_order_id" sequence="TaoBaoKeyFront" />
    <UploadImg text="上传截图2" :taskOrderId="initData.task_order_id" sequence="TaoBaoKeyBack" />
  </div>
</div>
  <div class="tips2">
    <p>提示-01:请直接截图，不要下拉再截图</p>
    <p>提示-02:两张图必须都上传</p>
    <p>提示-03:如果上传后不进入下一步，请耐心等待人工复审，或者3小时候咨询微信客服</p>
    <p>提示-04:验证不过会自动关闭任务，明天再试，持续不过就需更换淘宝账户</p>
    </div>
    <div class="bottom-tips ">验证通过，将自动进入任务说明页面</div>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getFreeOrderDetail, freeInfo } from '@/api/taskfree';
import UploadImg from '@/components/UploadImg.vue';
import { getQuery } from '@/util/cookie';

@Component({
  components: {
    UploadImg
  }
})
export default class TaskLoad extends Vue {
  private initData: freeInfo = {
    task_order_id: '',
    status: '',
    task_no: '',
    gift: '',
    taobao_key: '',
    taobao_key_url: '',
    taobao_key_url1: '',
    goods: []
  };
  private taskid: string = getQuery('tid') || '';
  private created() {
    let cancelLoading = this.$loading();
    getFreeOrderDetail(this.taskid)
      .then((res: freeInfo) => {
        cancelLoading();
        //数据逻辑处理
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
        this.initData = {
          task_order_id: '111',
          status: '222',
          task_no: '333',
          gift: '444',
          taobao_key: '555',
          taobao_key_url: '666',
          taobao_key_url1: '777',
          goods: [{ key_word: '888', url: '999' }, { key_word: '100', url: 'aaa' }]
        };
        cancelLoading();
      });
  }
  private onCopy() {
    this.$toast('复制成功');
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.info {
  font-size: 28px;
  padding: 0 20px;
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
  .tips2 {
    line-height: 1.5;
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
      left: 210px;
    }
    .copy {
      top: 5px;
      position: absolute;
      left: 0;
    }
  }
  .upload-block {
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