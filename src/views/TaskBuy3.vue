<template>
  <div class="info" >
    <div class="my">
    <div class="text mtop50">
    <div class="left">
      任务编号：<span class="red">**</span>
    </div>
    <div class="right">
      任务奖励：<span class="red">**</span>
    </div>
    </div>
    <div class="tips big">完成如下任务</div>
    <div class="tips">
         <div class="copy-block">
    <input v-model="otherid" placeholder="输入淘宝账户"/>
    <div class="btn copy"><span class="hollow">上传账户截图</span></div>
    </div>
    </div>
    <div class="bottom"><span>更换手机号，京东和淘宝账户</span></div>
    </div> 
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {}
})
export default class TaskFree extends Vue {
  private created() {}
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.info {
  font-size: 28px;
  .tips {
    text-align: center;
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
    }
    .copy {
      top: 5px;
      position: absolute;
      left: 400px;
    }
  }
  .my {
    border-radius: 8px;
    background: #fbf8f8;
    padding: 20px;
    margin: 30px;
  }
  p {
    line-height: 40px;
  }
  .mtop50 {
    margin-top: 50px;
  }
  .mright {
    margin-right: 50px;
  }
  .red {
    color: brown;
    font-weight: bold;
  }
  .record {
    height: 70px;
    position: relative;
    .time {
      position: absolute;
      left: 20px;
    }
    .money {
      position: absolute;
      right: 20px;
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #fff;
    background-color: #f4f4f8;
    span {
      display: inline-block;
      line-height: 34px;
      background: $themeMain;
      border-radius: 4px;
      padding: 10px 15px;
      margin: 20px auto;
    }
  }
}
</style>