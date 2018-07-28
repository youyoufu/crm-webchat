<template>
  <div class="login" >
    <div class="tips">未绑定淘宝账号,请绑定手机号和淘宝账户</div>
    <input v-model="user" placeholder="输入手机号"/>
    <div class="psw">
    <input v-model="phone" placeholder="输入淘宝账户"/>
    <!-- <div class="btn upload"><span class="hollow">上传账户截图</span></div> -->
    </div>
    <div class="btn" @click.stop.prevent="login"><span>保存</span></div>
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
  private taskid: string = getQuery('task_id') || '';
   private info: string = getQuery('url') || '';
  private login() {
    if (this.user && this.phone) {
    //   let cancelLoading = this.$loading();
      BindAccount(this.user,this.phone,'taobao')
      .then((res:{}) => {
        // cancelLoading();
        // console.log('BindAccount',res);

        let url = '/' + this.info + '?tid' + this.taskid;
        window.location.href = url;
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
.bind {
  font-size: 20px;
  margin: 40px auto;
  text-align: center;
  .tips {
    font-size: 34px;
    font-weight: bold;
    line-height: 44px;
    padding-bottom: 20px;
  }
  .tips-white {
    margin: 10px auto;
    line-height: 38px;
  }
  .btn {
    color: #fff;
    span {
      display: inline-block;
      line-height: 34px;
      background: $themeMain;
      border-radius: 4px;
      padding: 10px 15px;
      margin: 20px;
    }
  }
  .demo {
    margin-top: 50px;
    position: relative;
    span {
      position: absolute;
      top: 50%;
      left: 100px;
    }
    img {
      width: 450px;
      height: 350px;
      margin-left: 50px;
    }
  }
  .longbtn {
    width: 400px;
  }

  .bigger {
    font-size: 34px;
  }
}
</style>