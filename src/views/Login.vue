<template>
  <div class="login" >
    <div class="tips">欢迎首次登陆，请绑定手机号和淘宝账户</div>
    <input v-model="user" placeholder="输入手机号"/>
    <div class="psw">
    <input v-model="otherid" placeholder="输入淘宝账户"/>
    <div class="btn upload"><span class="hollow">上传账户截图</span></div>
    </div>
    <div class="tips gray">如何查看淘宝账号？</div>
    <div class="btn" @click.stop.prevent="login"><span>登陆</span></div>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { actions } from '@/store/modules/user/CONSTANTS';

@Component({
  components: {}
})
export default class Login extends Vue {
  private user: string = '';
  private otherid: string = '';
  private login() {
    if (this.user && this.otherid) {
      let cancelLoading = this.$loading();
      this.$store.dispatch({
        type: actions.login,
        username: this.user,
        otherid: this.otherid
      })
      .then(() => {
        // cancelLoading();
        // let redirect = this.$route.query.redirect;
        // this.$router.push(redirect ? { path: redirect } : 'user');
      })
      .catch((e: Error) => {
        cancelLoading();
        this.$toast(e.message);

        let redirect = this.$route.query.redirect;
        this.$router.push(redirect ? { path: redirect } : 'user');
      });
  }
}
}
</script>
<style lang="scss" scoped>
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
  input {
    font-size: 34px;
    width: 350px;
    border: 1px solid #999;
    padding: 10px 20px;
    margin: 20px 0;
    &::-webkit-input-placeholder {
      color: #bbb;
    }
  }
  .btn {
    color: #fff;
    span {
      display: inline-block;
      line-height: 34px;
      background: rgb(18, 140, 54);
      border-radius: 4px;
      padding: 10px 15px;
      margin: 20px auto;
    }
    .hollow {
      color: rgb(18, 140, 54);
      border: 1px solid rgb(18, 140, 54);
      background: none;
    }
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