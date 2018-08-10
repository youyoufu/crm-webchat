<template>
  <div class="share">
    <div class="center">
      <p class="tips1">您的邀请人为：
        <span class="red">{{mobile}}</span>
      </p>
      <p class="tips1">长按二维码，先关注公众号，然后再进行注册。</p>
      <!-- <img  :src=""> -->
    </div>
    <div class="bgcolor tips big">请绑定手机号和淘宝账户</div>

    <div class="share-cont">
      <input v-model="phone" placeholder="输入手机号" />
      <div class="psw">
        <input v-model="user" placeholder="输入淘宝账户" />
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
import { BindAccount, LoginInfo } from '@/api/login';
import { getQuery } from '@/util/cookie';

@Component({
  components: {}
})
export default class Login extends Vue {
  private user: string = '';
  private phone: string = '';
  private mobile: string = getQuery('mobile') || '';
  private info: string = getQuery('url') || '';
  private login() {
    if (this.user && this.phone) {
      console.log(1111);
      //   let cancelLoading = this.$loading();
      BindAccount(this.user, this.phone, 'taobao')
        .then((res: any) => {
          // cancelLoading();
          // console.log('BindAccount',res);

          // let url = '/' + this.info + '?tid=' + this.taskid;
          // window.location.href = url;
        })
        .catch((e: Error) => {
          this.$toast('新增账号失败');
          // cancelLoading();
          // this.$toast(e.message);
          // let redirect = this.$route.query.redirect;
          // this.$router.push(redirect ? { path: redirect } : '/');
        });
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