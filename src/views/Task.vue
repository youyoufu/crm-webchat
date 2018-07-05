<template>
  <div class="task" >
    您好,1233
        <div @click.stop="send">
          Click me!!!{{msg}}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import { getTaskList } from '@/api/task';
import { isWifi } from '@/util/network';
// import Toast from '../plugins/Toast/Toast.vue';

@Component({
  components: {
    TopNav
  }
})
export default class Task extends Vue {
  private msg: string = '';
  private send() {
    alert(isWifi());
    getTaskList()
      .then(() => {
        this.msg = '嗡嗡嗡';
      })
      .catch((e: Error) => {
        this.msg = 'err 555';
      });
  }
  // private created(){
  //   alert(isWifi);
  // }
}
</script>
<style lang="scss" scoped>
.task {
  padding-top: 80px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.5s ease;
  .open & {
    transform: translateX(480px);
  }
}
</style>