<template>
  <div class="tasklist">
    <div class="tips">每小时整点发放任务，准点来抢，怕抢不到就叫上亲朋好友一起来抢，但是，谁抢到，谁来做哦。</div>
    <div class="tips">一个账户，一周只能领取一次任务哦。</div>
    <div class="bgcolor tips1 big">免单返现任务</div>
    <ul class="task-list">
      <li class="task" @click="goToDeatil(item.id, 'free')" v-for="item in taskData.free_task">
        <img class="task-img" :src="item.main_product_url" />
        <p class="tips">返现比例：{{item.refund_rate}}</p>
        <p class="tips">您将收货：{{item.gift}}</p>
        <span class="btn-gray">立即领取</span>
      </li>
    </ul>
    <div class="bgcolor tips1 big">挖宝任务</div>
    <ul class="task-list">
      <li class="task" @click="goToDeatil(item.id, 'refund')" v-for="item in taskData.refund_task">
        <img class="task-img" :src="item.url" />
        <span class="btn-gray">挖这个宝</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getCenterTask, getCreateTask, CenterTaskData } from '@/api/task';
import { getQuery } from '@/util/cookie';
import { login } from '@/api/login';
import { hasLogin } from '@/util/session';

@Component({
  components: {}
})
export default class TaskList extends Vue {
  private taskData: CenterTaskData = {
    free_task: [],
    refund_task: []
  };
  private sid: string = getQuery('sellerid') || '';
  private listType: string = getQuery('type') || 'free';
  private isFree: boolean = getQuery('type') === 'free';
  private created() {
    // if (!hasLogin()) {
    //   login(this.sid, 'taskcenter');
    // } else {
    getCenterTask('all')
      .then((res: any) => {
        this.taskData = res;
      })
      .catch((err: { message: string }) => {
        console.log(1111);
        this.$toast(err.message);
        this.taskData = {
          free_task: [
            { refund_rate: '返现比例', gift: '礼物', url: '图片' },
            { refund_rate: '返现比例1', gift: '礼物', url: '图片' },
            { refund_rate: '返现比例', gift: '礼物', url: '图片' },
            { refund_rate: '返现比例1', gift: '礼物', url: '图片' }
          ],
          refund_task: [{ url: '图片', bonus_point: '积分' }, { url: '图片1', bonus_point: '积分' }]
        };
      });
    // }
  }
  private goToDeatil(tid: string, type: string) {
    getCreateTask(this.listType, tid)
      .then((res: any) => {
        let info = 'taskbuy';
        let url = '/taskbuy?tid=' + tid;
        if (type === 'refund') {
          url = '/taskrefund?tid=' + tid;
          info ='taskrefund';
        }
        console.log(res.is_exists_account);
        if(res.is_exists_account === 'no'){
          window.location.href = '/addAcount?task_id=' + tid + '&url=' + info + '&type=' + type;
        } else {
          window.location.href = url;
        }
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.tasklist {
  font-size: 28px;
  padding: 20px 20px;
  .tips {
    font-size: 28px;
    margin: 10px auto;
    line-height: 38px;
    margin: 0 20px;
    text-align: left;
  }
  .tips1 {
    margin: 10px auto;
    line-height: 38px;
    margin: 0 -20px;
    text-align: center;
  }
  .task-list {
    display: inline-block;
    overflow: hidden;
    text-align: center;
    width: 720px;
    .task {
      display: block;
      width: 50%;
      float: left;
    }
    .task-img {
      margin: 10px 40px;
      width: 250px;
      height: 100px;
    }
  }
}
</style>