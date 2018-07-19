<template>
  <div class="info" >
     <div class="tips1">确认收货后，系统返款给你，就是完成任务啦，系统多奖励您一次免单任务，请从下面任务中挑选一个，当日完成。</div>
    <ul class="task-list mtop50">
      <li class="task"  @click="goToDeatil(item.id)"  v-for="item in taskData">
  <img class="task-img" :src="item.url"  />
 <span class="btn-gray">立即领取</span>
      </li>
  <!-- <div class="task">
  
  </div>
  <div class="task"> 
    <img class="task-img" src="../assets/imgs/demo.png"  />
    <span class="btn-gray">立即领取</span>
    </div> -->
    </ul>
    </div> 
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTasksList, TasksListData } from '@/api/task';

@Component({
  components: {}
})
export default class TaskList extends Vue {
  private taskData: Array<TasksListData> = [];
  private created() {
    getTasksList('free')
      .then((res: [{}]) => {
        this.taskData = res;
        console.log('getTasksList', res);
      })
      .catch(err => {
        this.taskData = [{ id: '1', url: '111' }, { id: '3', url: '333' }, { id: '2', url: '222' }];
        console.log('getTasksList error', err);
      });
  }
  private goToDeatil(tid) {
    window.location.href = '/taskbuy1?tid=' + tid;
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
    overflow:hidden;
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