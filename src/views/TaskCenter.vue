<template>
  <div class="tasklist">
    <div class="tips">活动每小时整点开启，准点来抢，一个人抢不到就叫上亲朋好友一起来抢，全天24小时，每小时都有活动哦。</div>
    <div class="bgcolor tips1 big">免单返现活动</div>
    <ul class="task-list">
      <li class="task" @click="goToDeatil(item.id, 'free')" v-for="item in taskData.free_task">
        <img class="task-img" :src="item.main_product_url" />
        <p class="tips">返现比例：{{item.refund_rate}}%</p>
        <p class="tips">您将收货：{{item.gift}}</p>
        <span class="btn-gray">立即领取</span>
      </li>
    </ul>
    <div class="bgcolor tips1 big">挖宝活动</div>
    <ul class="task-list">
      <li class="task" @click="goToDeatil(item.id, 'refund')" v-for="item in taskData.refund_task">
        <img class="task-img" :src="item.url" />
        <span class="btn-gray">挖这个宝</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getTasksList, getCreateTask, CenterTaskData } from "@/api/task";
import { getQuery } from "@/util/cookie";
import { login } from "@/api/login";
import { hasLogin, accountToken } from "@/util/session";
import { isWifi } from "@/util/network";
import { setCookie } from "@/util/cookie";

@Component({
  components: {}
})
export default class TaskList extends Vue {
  private taskData: CenterTaskData = {
    free_task: [],
    refund_task: []
  };
  private account: string = getQuery("account") || "";
  private created() {
    if (!hasLogin()) {
      login(this.account, "taskcenter");
    } else {
      getTasksList("all")
        .then((res: any) => {
          this.taskData = res;
        })
        .catch((err: { message: string }) => {
          this.$toast(err.message);
        });
    }
  }
  private goToDeatil(tid: string, type: string) {
    let wifi=isWifi()||true;
    alert(isWifi())
    if (!wifi) {
      getCreateTask(type, tid)
        .then((res: any) => {
          let info = "taskbuy";
          let url = "/taskbuy?tid=" + tid;
          if (type === "refund") {
            url = "/taskrefund?tid=" + tid;
            info = "taskrefund";
          }
          console.log(res.is_exists_account);
          if (res.is_exists_account === "no") {
            window.location.href =
              "/addAcount?task_id=" + tid + "&url=" + info + "&type=" + type;
          } else {
            window.location.href = url;
          }
        })
        .catch((err: { message: string }) => {
          this.$toast(err.message);
        });
    } else {
      this.$toast("任务期间禁止使用WIFI网络，请先切至3G或4G网络");
      return;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/theme.scss";
@import "../scss/_px2px.scss";
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
      height: 250px;
    }
  }
}
</style>