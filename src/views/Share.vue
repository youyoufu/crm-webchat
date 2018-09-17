<template>
  <div class="share">
    <div class="center">
      <p class="tips1">您的邀请人为：
        <span class="red">{{invitor_phone}}</span>
      </p>
      <p class="tips1">长按二维码，先关注公众号，然后再进行注册。</p>
      <img  :src="codeimg" class="ewmcode">
    </div>
    <div class="bgcolor tips big">请绑定手机号和淘宝账户</div>

    <div class="share-cont">
      <input v-model="phone" placeholder="输入手机号" />
      <div class="psw">
        <input v-model="account" placeholder="输入淘宝账户" />
        <div class="upload">
          <span class="hollow">上传账户截图</span>
        </div>
      </div>
      <div class="tips1">如何查看淘宝账号？</div>
      <div class="btn" @click="login">保存</div>
      <div>
        <p class="tips1"> 提示：</p>
        <p class="tips1">1.手机号一定要是自己的，涉及到返现。</p>
        <p class="tips1">2.如何查看淘宝账户，就是淘宝会员名？ </p>
        <p class="tips1">进入手机淘宝-我的淘宝-设置，即可看到会员名</p>
        <p class="tips1">如果懒得输入会员名，把这个页面截图上传，我们会自动识别你的会员名，会员名有特殊字符的识别有误可自行修改核对后，再点确定提交。</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { actions } from '@/store/modules/user/CONSTANTS';
import { getShareInfoCode, saveAccountInfo } from '@/api/invite';
import { getCookie,getQuery,setCookie } from '@/util/cookie';
import { accountToken,invitorPhone,taobaoAccount,myPhone } from '@/util/session';

@Component({
  components: {}
})
export default class Share extends Vue {
  private seller_account: string = getCookie(accountToken)||'';
  private invitor_phone: string = getQuery('mobile');
  private phone: string = '';
  private account: string = '';
  private codeimg:string='';
  private created(){
    getShareInfoCode(this.seller_account) .then((res: any) => {
      this.codeimg=res.qcode;
    }).catch((e: Error) => {
        this.$toast(e.message);
    });
  }
  private login() {
    if (this.account && this.phone) {
      setCookie(myPhone,this.phone);
      setCookie(taobaoAccount,this.account);
      setCookie(invitorPhone,this.invitor_phone);
      // saveAccountInfo(this.phone,this.account, this.seller_account,this.invitor_phone)
      //   .then((res: any) => {
      //     window.location.href = '/taskcenter?account='+this.seller_account;
      //   })
      //   .catch((e: Error) => {
      //     this.$toast('新增账号失败');
      //     // cancelLoading();
      //     // this.$toast(e.message);
      //     // let redirect = this.$route.query.redirect;
      //     // this.$router.push(redirect ? { path: redirect } : '/');
      //   });
    } else {
      this.$toast('账号及电话号码不允许为空');
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.share {
  .tips1 {
    margin: 10px auto;
    line-height: 38px;
    // color: #333;
    font-size: 28px;
  }
  .tips {
    font-size: 34px;
    font-weight: bold;
    line-height: 44px;
    padding-bottom: 20px;
    text-align: center;
  }
  .ewmcode{
    width:220px;
    height:220px;
  }
  .center {
    text-align: center;
    padding-left: 20px;
  }
  .share-cont {
    font-size: 20px;
    margin: 40px auto;
    padding-left: 80px;

    .tips-white {
      margin: 10px auto;
      line-height: 38px;
    }
    .btn {
      margin: 20px auto 50px;
      color: #fff;
      padding: 10px 50px;
    }
    .upload {
      margin-left: 20px;
    }
    .bigger {
      font-size: 34px;
    }
  }
}
</style>