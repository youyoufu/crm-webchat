<template>
  <div class="inviter">
    <div class="tips1">点击右上角，可直接分享到朋友圈和微信群进行邀请。</div>
    <div class="tips1 mtop50">或者复制邀请链接，发给被邀请人，您的邀请链接为：</div>
    <div class="copy-block">
      <input v-model="shareurl" readonly />
      <div class="btn-hollow copy" v-clipboard:copy="shareurl" v-clipboard:success="onCopy">
        <span class="hollow">点击复制</span>
      </div>
    </div>
    <div class="tips1 mtop50">邀请说明：您的好友通过您分享的邀请进行注册，并完成一次免单返现活动，邀请人即可获得现金红包奖励。</div>
    <div class="tips1 mtop50">
      <p>三级邀请奖励机制：</p>
      <p>1.A邀请B，得20积分</p>
      <p>2.B邀请C，B得20积分，A得10积分</p>
      <p>3.C邀请D，C得20积分，B得10积分，A得5积分</p>
      <p class="mtop50">1积分0.1元，20积分就是2元，去人中心可兑换积分为现金红包，进行领取红包。（30积分起兑，去<a :href="userurl" color="#009688">个人中心</a>兑换）</p>
    </div>
    <div class="tips big bgcolor">直接邀请人</div>
    <div class="tips1 ">下面是你邀请的朋友，如果他不太会做活动，记得帮忙给他帮助哦</div>
    <div class="my">
      <div class="record head">
        <span class="time">被邀请人</span>
        <span class="order">是否邀请成功</span>
        <span class="money">积分收入</span>
      </div>
      <div class="record body" v-for="item in initData.invite_list" :key="item.phone">
        <span class="time">{{item.name}}</span>
        <span class="order">{{item.success=='1'?'成功':'失败'}}</span>
        <span class="money">{{item.bonus_point}}</span>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getQuery } from "@/util/cookie";
import { sharePage } from "@/util/share";
import { getInviteInfo, shareInfo } from "@/api/invite";
import { login } from "@/api/login";
import { hasLogin, accountToken } from "@/util/session";
@Component({
  components: {}
})
export default class TaskFree extends Vue {
  private shareurl = "";
  private initData: shareInfo = {
    name: "",
    phone: "",
    status: "",
    invite_list: []
  };
  private key = "";
  private account: string = getQuery("account") || "";
  private userurl: string = "";
  private created() {
    this.userurl = "http://wx.niurouzhou.com/taskcenter?account=" + this.account;
    if (!hasLogin(this.account)) {
      login(this.account, "invite");
    } else {
      let that = this;
      getInviteInfo()
        .then((res: any) => {
          this.initData = res;
          this.shareurl =
            "http://wx.niurouzhou.com/share?mobile=" +
            this.initData.phone +
            "&account=" +
            this.account;
          //数据逻辑处理
          console.log(222, this.initData);
          let config = {
            shareTitle: "快来参加我们的免费领赠品活动",
            shareUrl: this.shareurl,
            shareImg:
              "http://niurouzhou-0709-gz-1251198067.cos.ap-guangzhou.myqcloud.com/17ecfa6c-6ec2-110b-d948-b1ef42344b22.jpeg",
            shareContent: "特别说明：所有活动免费，有赠品，还有红包哦！",
            successCallback: function() {
              that.$toast("分享成功～");
            }
          };
          sharePage(config);
        })
        .catch((err: { message: string }) => {
          this.$toast(err.message);
        });
    }
  }
  private onCopy() {
    this.$toast("复制成功");
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/theme.scss";
@import "../scss/_px2px.scss";
.inviter {
  font-size: 28px;
  padding: 0 20px;
  .banner {
    width: 700px;
    height: 100%;
  }
  .tips {
    margin: 10px auto;
    line-height: 1.5;
    margin: 0 -20px;
    text-align: center;
  }
  .tips1 {
    margin: 10px auto;
    line-height: 2;
  }
  .big {
    font-size: 34px;
  }
  .copy-block {
    text-align: center;
    input {
      width: 680px;
    }
  }
  .my {
    border-radius: 8px;
    background: #f9f9f9;
    padding: 20px;
    margin: 30px 0;
  }
  .record {
    text-align: center;
    height: 70px;
    position: relative;
    span {
      float: left;
    }
    .time {
      width: 220px;
    }
    .order {
      width: 220px;
    }
    .money {
      width: 220px;
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