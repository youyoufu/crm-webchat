<template>
  <div class="info" >
  <div v-if="isFree"  class="tips1">确认收货后，系统返款给你，就是完成任务啦，系统多奖励您一次免单任务，请从下面任务中挑选一个，当日完成。</div>
  <div v-else class="tips1">每天最多做10个挖宝任务，每小时最多3个。挖一个宝奖励2毛钱+1积分。30个积分可兑换一次免单任务。</div>
  <ul class="task-list mtop50">
    <li class="task"  @click="goToDeatil(item.id)"  v-for="item in taskData">
      <img class="task-img" :src="item.url"  />
      <span  v-if="isFree" class="btn-gray">立即领取</span>
      <span  v-else class="btn-gray">挖这个宝</span>
    </li>
  </ul>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTasksList, TasksListData } from '@/api/task';
import { getQuery } from '@/util/cookie';

@Component({
  components: {}
})
export default class TaskList extends Vue {
  private taskData: Array<TasksListData>=[];
  private listType: string = getQuery('type') || 'free';
  private isFree: boolean = getQuery('type') === 'free';
  private created() {
    getTasksList(this.listType)
      .then((res: [TasksListData]) => {
        this.taskData = res;
      })
      .catch((err: { message: string }) => {
        this.taskData = [{ id: '1', url: '111' }, { id: '3', url: '333' }, { id: '2', url: '222' }];
        this.$toast(err.message);
      });
  }
  private goToDeatil(tid: string) {
    let url = '/taskbuy1?tid=' + tid;
    if (!this.isFree) {
      url = '/taskrefund?tid=' + tid;
    }
    window.location.href = url;
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/theme.scss';
@import '../scss/_px2px.scss';
.info {
  font-size: 28px;
  padding: 20px 20px;

  .tips {
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