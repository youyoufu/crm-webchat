<template>
  <div class="info">
    <div class="my">
      <div class="tips">Hello,{{userCenter.name}}</div>
      <div class="text mtop50">
        免单返现活动:
        <span class="red">{{userCenter.free_task_time}}</span>
        <span class="mright40">次</span>
        挖宝活动:
        <span class="red">{{userCenter.refund_task_time}}</span>
        <span class="mright40">次</span>
        积分:
        <span class="red">{{userCenter.bonus_point}}</span>
      </div>
      <p class="text mtop50">
        您绑定的淘宝账户为:
        <span class="red">{{userCenter.taobao_account}}</span>， 京东账户为:
        <span class="red">{{userCenter.jd_account}}</span>， 手机号为:
        <span class="red">{{userCenter.phone}}</span>，做活动时，请注意使用对应的淘宝京东账户。
      </p>
      <p class="text mtop50">
        您的邀请码为:
        <span class="red">{{userCenter.phone}}</span>
        <!-- <span>点击复制邀请链接</span> -->
      </p>
    </div>
    <div class="tips big">返还提现记录</div>
    <div class="my">
      <div class="record head">
        <span class="time">活动时间</span>
        <span class="order">活动ID</span>
        <span class="money">应返现金额</span>
        <span class="status">返现状态</span>
      </div>
      <div class="record body" v-for="item in userCenter.refund_list">
        <span class="time">{{item.execute_time}}</span>
        <span class="order">{{item.id}}</span>
        <span class="money">{{item.refund}}</span>
        <span class="status">{{item.status==5?'已返款':'未返款'}}</span>
      </div>
    </div>
    <!-- <div class="btn">
      <span>更换手机号，京东和淘宝账户</span>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getQuery } from "@/util/cookie";
import { getUserCenter, userCenterInfo } from "@/api/user";
import { login } from "@/api/login";
import { hasLogin, accountToken } from "@/util/session";
import { setCookie } from "@/util/cookie";

@Component({
  components: {}
})
export default class User extends Vue {
  private account: string = getQuery("account") || "";
  private userCenter: userCenterInfo = {
    name: "",
    free_task_time: "",
    refund_task_time: "",
    bonus_point: "",
    taobao_account: "",
    jd_account: "",
    phone: "",
    refund_list: []
  };
  private created() {
    if (!hasLogin(this.account)) {
      login(this.account, "");
    } else {
      getUserCenter()
        .then((res: any) => {
          this.userCenter = res;
        })
        .catch((res: { message: string }) => {
          this.$toast(res.message);
        });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/theme.scss";
@import "../scss/_px2px.scss";
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
  .my {
    border-radius: 8px;
    background: #f9f9f9;
    padding: 20px;
    margin: 30px;
  }
  p {
    line-height: 40px;
  }
  .record {
    text-align: center;
    height: 70px;
    position: relative;
    span {
      float: left;
    }
    .time {
      width: 180px;
    }
    .order {
      width: 180px;
    }
    .money {
      width: 140px;
    }
    .status {
      width: 140px;
    }
  }
  .record.head {
    font-weight: bold;
  }
  .record.bold {
    color: #999;
  }
  .btn {
    position: absolute;
    bottom: 20px;
    left: 200px;
  }
}
</style>