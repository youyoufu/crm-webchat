<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { PREFIX, actions } from '@/store/modules/user/CONSTANTS';
import { hasLogin, saveLogin } from "@/util/session";
import { login } from "@/api/login";

@Component
export default class App extends Vue {
  private created() {
    if (!hasLogin()) {
      login()
        .then(res => {
          saveLogin("youyoufu");
          console.log(111);
        })
        .catch(err => {
          console.error(111, err);
        });
    }
    // let user = this.$store.state[PREFIX];
    // if (!user || !user.id) {
    //   console.log(1111);
    //   // this.$store.dispatch(actions.getUserInfo);
    // }
  }
}
</script>

