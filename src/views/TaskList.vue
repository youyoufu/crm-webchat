<template>
  <div class="tasklist">
    <div v-if="isFree" class="tips">
      <p>我们已收到你的订单，即将安排发货，收到产品，确认收货后，系统返款给你。</p>
      <p>我们还有其他活动进行中，欢迎您邀请亲朋好友来参与。</p>
    </div>
    <div v-else class="tips">每天最多做10个挖宝活动，每小时最多3个。挖一个宝奖励2毛钱+1积分。30个积分可兑换一次免单活动。</div>
    <ul class="task-list mtop50">
      <li class="task" @click="goToDeatil(item.id)" v-for="item in taskData">
        <img class="task-img" :src="item.url" />
        <span v-if="isFree" class="btn-gray">立即领取</span>
        <span v-else class="btn-gray">挖这个宝</span>
      </li>
    </ul>
    <div class="btn-block">
      <a class="btn-hollow" :href="user">前往个人中心</a>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTasksList, TasksListData, getCreateTask } from '@/api/task';
import { getQuery, getCookie } from '@/util/cookie';
import { accountToken } from '@/util/session';

@Component({
  components: {}
})
export default class TaskList extends Vue {
  private taskData: Array<TasksListData> = [];
  private listType: string = getQuery('type') || 'free';
  private isFree: boolean = getQuery('type') === 'free';
  private user: string = '/' + getCookie('accountToken');
  private created() {
    getTasksList(this.listType)
      .then((res: any) => {
        this.taskData = res;
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
  private goToDeatil(tid: string) {
    getCreateTask(this.listType, tid)
      .then((res: any) => {
        let url = '/taskbuy?tid=' + res.task_id;
        if (!this.isFree) {
          url = '/taskrefund?tid=' + res.task_id;
        }
        window.location.href = url;
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
      height: 250px;
    }
  }
  .btn-block {
    padding-top: 30px;
    border-top: 1px solid #ebebeb;
    text-align: center;
    .btn-hollow {
      text-decoration: none;
    }
  }
}
</style>