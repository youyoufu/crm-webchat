<template>
  <div class="task" >
   您好,1233<div @click.stop="send">
      Click me!!!{{msg}}
    </div> 
     <ul>
    <li v-for="product in products">
      {{ product.title }} - {{ product.price | currency }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul> 
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from '@/components/TopNav.vue';
import { getTaskList } from '@/api/task';
import { isWifi } from '@/util/network';
// import Toast from '../plugins/Toast/Toast.vue';
import { actions, PREFIX } from '@/store/modules/task/CONSTANTS';

@Component({
  components: {
    TopNav
  }
})
export default class Task extends Vue {
  private msg: string = '';
  private get products() {
    return this.$store.state[PREFIX]['products'];
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