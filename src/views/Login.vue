<template>
  <div class="login" >
    <div class="tips">欢迎首次登陆，请绑定手机号和淘宝账户</div>
    <input v-model="user" placeholder="输入手机号"/>
    <div class="psw">
    <input v-model="phone" placeholder="输入淘宝账户"/>
    <!-- <div class="btn upload"><span class="hollow">上传账户截图</span></div> -->
    </div>
    <div class="tips gray">如何查看淘宝账号？</div>
    <div class="btn" @click.stop.prevent="login"><span>登陆</span></div>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { actions } from '@/store/modules/user/CONSTANTS';
import { BindAccount, LoginInfo } from '@/api/login';

@Component({
  components: {}
})
export default class Login extends Vue {
  private user: string = '';
  private phone: string = '';
  private login() {
    if (this.user && this.phone) {
      // let cancelLoading = this.$loading();
      // BindAccount({
      //   account: this.user,
      //   phone: this.phone,
      //   type:'taobao'
      // })
      // .then((res:{}) => {
      //   cancelLoading();
      //   console.log('BindAccount',res);
      //   let redirect = this.$route.query.redirect;
      //   this.$router.push(redirect ? { path: redirect } : '/');
      // })
      // .catch((e: Error) => {
      //   cancelLoading();
      //   // this.$toast(e.message);
      //   // let redirect = this.$route.query.redirect;
      //   // this.$router.push(redirect ? { path: redirect } : '/');
      // });
  }
}
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.login {
  font-size: 28px;
  margin: 80px auto 0 80px;
  .tips {
    margin: 10px auto;
    line-height: 38px;
    font-size: 32px;
  }
  .gray {
    color: gray;
    font-size: 28px;
  }
  .psw {
    height: 100px;
    position: relative;
    input {
      position: absolute;
    }
    .upload {
      top: 5px;
      position: absolute;
      left: 400px;
    }
  }
}
</style>