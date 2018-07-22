<template>
  <div class="task">
    <img :src="img" alt="" class="info">
    <UploadImg taskOrderId="111" text="上传图片试试" @fileChange="fileChange" />
    <div><input value="11112222">
      <div v-clipboard:copy="copyInfo" v-clipboard:success="onCopy">复制</div>
      您好,1233
      <div @click.stop="send">
        Click me!!!{{msg}}
      </div>
    </div>
    <ul>
      <li v-for="product in products">
        {{ product.title }} - {{ product.price | currency }}
        <br>
        <button :disabled="!product.inventory" @click="addProductToCart(product)">
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import UploadImg from '@/components/UploadImg.vue';
import { getTaskList } from '@/api/task';
import { isWifi } from '@/util/network';
import { actions, PREFIX } from '@/store/modules/task/CONSTANTS';
// import Toast from '../plugins/Toast/Toast.vue';
@Component({
  components: {
    TopNav,
    UploadImg
  }
})
export default class Task extends Vue {
  private img: string = '';
  private msg: string = '';
  private copyInfo: string = '231231231212';
  private get products() {
    return this.$store.state[PREFIX]['products'];
  }
  // private fileChange(file: any) {
  //   console.log('upload file:', file);
  //   // 因为file是个FormData格式的对象所以可以直接通过接口开始上传，不需要做多余操作
  //   // this.axios.post('/upload/thumb', file).then(
  //   //   res => {
  //   //     console.log(res.data.datas);
  //   //     this.img = this.HTTP + res.data.datas;
  //   //   },
  //   //   err => {
  //   //     console.log(err);
  //   //   }
  //   // );
  // }
  private onCopy() {
    console.log('复制成功');
  }
  private send() {
    console.log(isWifi());
    // this.products = getTaskList();
    // console.log(123,this.products);
    // .then(() => {
    //   this.msg = '嗡嗡嗡';
    // })
    // .catch((e: Error) => {
    //   this.msg = 'err 555';
    // });
  }
  private created() {
    // alert('init page...');
    // this.products = getTaskList();
    let dd = this.$store.dispatch(actions.getAllProducts);
    dd
      .then(data => {
        this.msg = '嗡嗡嗡';
        console.log(222, this.$store.state);
      })
      .catch((e: Error) => {
        this.msg = 'err 555';
      });
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
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