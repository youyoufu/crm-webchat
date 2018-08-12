<template>
  <div class="taskbuy">
    <div class="base">
      <p class="tips1">
        活动编号：
        <span class="red">{{initData.task_no}}</span>
      </p>
      <p class="tips1">
        活动赠品：
        <span class="red">{{initData.gift}}</span>
      </p>
      <p class="tips1">
        活动特别说明：
        <span class="red">{{initData.content}}</span>
      </p>
    </div>
    <div v-if="isFirst">
      <div class="bgcolor tips big">完成账户验证后进入活动介绍</div>
      <div class="tips1 green">复制下面淘口令，打开手机淘宝，按说明截图</div>
      <div class="copy-block">
        <input v-model="initData.taobao_key" readonly />
        <div class="btn-hollow copy" v-clipboard:copy="initData.taobao_key" v-clipboard:success="onCopy">
          <span class="hollow">点击复制</span>
        </div>
      </div>
      <div class="upload-block">
        <div class="upload-img">
          <img v-if="initData.check_first_url" :src="initData.check_first_url" />
          <img v-else src="../assets/imgs/upload-icon.jpg" />
          <img v-if="initData.check_second_url" :src="initData.check_second_url" />
          <img v-else src="../assets/imgs/upload-icon.jpg" />
        </div>
        <div class="upload-btn">
          <UploadImg text="上传截图1" keyName="check_first_url" :taskOrderId="initData.id" @fileChange="fileChange" sequence="TaoBaoKeyFront" />
          <UploadImg text="上传截图2" keyName="check_second_url" :taskOrderId="initData.id" @fileChange="fileChange" sequence="TaoBaoKeyBack" />
        </div>
      </div>
      <div class="textcenter">
        <div class="btn logbtn" @click="confirmCheck">提交验证</div>
      </div>
      <div class="tips2">
        <p>提示-01:请直接截图，不要下拉再截图</p>
        <p>提示-02:两张图必须都上传</p>
        <p>提示-03:如果上传后不进入下一步，请重新上传</p>
        <p>提示-04：验证不过会自动关闭活动，明天再试，持续不过就更换淘宝账户。</p>
      </div>
      <div class="bottom-tips mtop200">验证通过，将自动进入活动说明页面</div>
    </div>
    <div v-if="isSecond">
      <div class="bgcolor tips big">已完成验证，下面是活动介绍</div>
      <div class="tips1 green">活动简短说明：所有活动都是组合活动，就是要一起拍{{initData.goods.length}}个产品，搜索关键词，找到产品，收藏宝贝，并放入购物车，拍下后不要付款，复制订单号进行提交</div>
      <div class="good-block" v-for="item in initData.goods" :key="item.keyword">
        <div class="copy-block">
          <input v-model="item.keyword" readonly />
          <div class="btn-hollow copy" v-clipboard:copy="item.keyword" v-clipboard:success="onCopy">
            <span class="hollow">点击复制</span>
          </div>
        </div>
        <div class="tips1">复制关键词后，打开手机淘宝搜索关键词，找到下图宝贝，关注宝贝，并将
          <span class="red downline">{{item.sku}}</span> 加入购物车</div>
        <div class="upload-block">
          <div class="upload-img1">
            <img :src="item.long_url" />
            <img :src="item.square_url" />
          </div>
        </div>
      </div>
      <div class="bgcolor mtop50 tips big">参照下图，核对订单产品和订单金额</div>
      <div style="text-align:center">
        <img class="longGoodimg mtop50" :src="initData.url" />
      </div>
      <div class="bgcolor mtop50 tips big">确定后，留言{{initData.comments}}，提交订单，不要付款</div>
      <div class="tips1">复制订单号，在下面粘贴订单号</div>
      <div class="textcenter">
        <div>
          <input v-model="orderid" placeholder="订单编号" />
        </div>
        <div class="btn logbtn" @click="commitOrderNo">提交订单号</div>
      </div>
      <div class="bottom-tips mtop200">提交订单号后，进入自我校验活动</div>
    </div>
    <div v-if="isThird">
      <div class="bgcolor mtop50 tips big">请稍等，订单审核通过会通知付款</div>
      <div class="tips1 green">系统正在核对订单，请等待系统付款通知（10-20分钟左右），休息片刻，再来查看，感谢您的支持。</div>
      <div class="textcenter">
        <div class="btn logbtn" v-if="initData.status=='4'">审核通过，请完成付款</div>
        <div class="btn logbtn" v-else-if="initData.status=='5'">已返款</div>
        <div class="btn logbtn" v-else-if="initData.status=='3'">审核失败</div>
        <div class="btn logbtn" v-else>系统审核中</div>
      </div>
      <p class="tips1">友情提示：</p>
      <p class="tips1">付款后，平台会安排发货，收到货后，文字评价，不要晒图。</p>
      <div class="bgcolor tips big">等不及？自我校验宝贝是否找对！</div>
      <div>
        <textarea placeholder="此处粘贴宝贝1的微信分享淘口令" v-model="txtarea1" />
        <textarea placeholder="此处粘贴宝贝2的微信分享淘口令" v-model="txtarea2" />
      </div>
      <div class="textcenter">
        <div class="btn-gray" @click="checkTaobaoKey">立即校验</div>
      </div>
      <div class="tips1">提示：针对正参加淘抢购聚划算等有付款时间限制产品，需要15分钟内完成付款，遇到这种情况，可进行自我效验宝贝是否找对，并核对下单金额无误，可提前付款，然后等待系统审核通知，如系统通知审核失败，请申请退款，放弃活动，重新接活动。</div>
      <div class="bgcolor mtop50 tips big">付款后：上传订单截图，微信收款码截图</div>
      <div class="upload-block">
        <div class="upload-img">
          <img v-if="initData.order_pic_url" :src="initData.order_pic_url" />
          <img v-else src="../assets/imgs/upload-icon.jpg" />
          <img v-if="initData.wechat_code_url" :src="initData.wechat_code_url" />
          <img v-else src="../assets/imgs/upload-icon.jpg" />
        </div>
        <div class="upload-btn">
          <UploadImg text="上传-订单截图" keyName="order_pic_url" :taskOrderId="initData.id" @fileChange="fileChange" sequence="TaoBaoOrder" />
          <UploadImg text="上传-微信收款码截图" keyName="wechat_code_url" :taskOrderId="initData.id" @fileChange="fileChange" sequence="WechatCode" />
        </div>
      </div>
      <div class="textcenter">
        <div class="btn" @click="confirmOrder">点击确认，坐等收货赠品吧!</div>
      </div>
      <div class="bottom-tips mtop100">确认后，将返回个人中心</div>
    </div>
    <div class="btn-center" v-if="initData.status!='5'">
      <div class="btn-gray" @click="closeTask">放弃活动</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  getFreeOrderDetail,
  freeInfo,
  setOrderNo,
  setCheckTBkey
} from "@/api/taskfree";
import { getCreateTask, setCloseTask } from "@/api/task";
import UploadImg from "@/components/UploadImg.vue";
import { getQuery } from "@/util/cookie";

@Component({
  components: {
    UploadImg
  }
})
export default class TaskLoad extends Vue {
  private initData: freeInfo = {
    id: "",
    status: "",
    task_no: "",
    gift: "",
    taobao_key: "",
    check_first_url: "",
    check_second_url: "",
    goods: [],
    wechat_code_url: "",
    order_pic_url: "",
    content: ""
  };
  private isFirst: boolean = true;
  private isSecond: boolean = false;
  private isThird: boolean = false;
  private taskid: string = getQuery("tid") || "";
  private orderid: string = "";
  private txtarea1: string = "";
  private txtarea2: string = "";
  private checkStatus() {
    let status = parseInt(this.initData.status);
    if (status == 0) {
      this.isFirst = true;
      document.title = "活动进行中：第1步，共3步";
    } else if (status == 1) {
      document.title = "活动进行中：第2步，共3步";
      this.isFirst = false;
      this.isSecond = true;
    } else if (status >= 2 || status <= 5) {
      this.isFirst = false;
      this.isSecond = false;
      this.isThird = true;
      document.title = "活动进行中：第3步，共3步";
    }
  }
  private closeTask() {
    setCloseTask("9", this.initData.id)
      .then((res: freeInfo) => {
        this.$toast("订单已关闭");
        setTimeout(() => {
          window.location.href = "/taskcenter";
        }, 3000);
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
  private created() {
    this.$loading(true);
    getCreateTask("free", this.taskid)
      .then((res: freeInfo) => {
        this.$loading(false);
        this.initData = res;
        this.checkStatus();
      })
      .catch((err: { message: string }) => {
        this.$loading(false);
        this.$toast(err.message);
      });
  }
  private fileChange(
    obj: { url: string; keyName: string; status: string },
    msg
  ) {
    if (msg !== "") {
      this.$toast("验证不通过");
      return;
    }
    if (obj.keyName === "check_first_url") {
      this.initData.check_first_url = obj.url;
    } else if (obj.keyName === "check_second_url") {
      this.initData.check_second_url = obj.url;
    } else if (obj.keyName === "wechat_code_url") {
      this.initData.wechat_code_url = obj.url;
    } else if (obj.keyName === "order_pic_url") {
      this.initData.order_pic_url = obj.url;
    }
  }

  private confirmCheck() {
    if (
      this.initData.check_first_url !== "" &&
      this.initData.check_second_url !== ""
    ) {
      this.initData.status = "1";
      this.checkStatus();
    }
  }
  private onCopy() {
    this.$toast("复制成功");
  }
  private commitOrderNo() {
    if (this.orderid === "") {
      this.$toast("请先粘贴订单编号");
      return;
    }
    setOrderNo(this.initData.id, this.orderid)
      .then((res: any) => {
        this.$toast("订单编号提交成功");
        //数据逻辑处理
        this.initData.status = 2;
        this.checkStatus();
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
  private checkTaobaoKey() {
    if (this.txtarea1 === "" || this.txtarea2 === "") {
      this.$toast("请先粘贴淘口令");
      return;
    }
    setCheckTBkey(this.initData.id, this.txtarea1, this.txtarea2)
      .then((res: {}) => {
        this.$toast("校验成功");
        //数据逻辑处理
      })
      .catch((err: { message: string }) => {
        this.$toast(err.message);
      });
  }
  private confirmOrder() {
    if (
      this.initData.wechat_code_url === "" ||
      this.initData.order_pic_url === ""
    ) {
      this.$toast("请先完成活动要求");
      return;
    } else {
      this.$toast("您的该活动已经完成～");
      setTimeout(() => {
        window.location.href = "/tasklist?type=free";
      }, 3000);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/theme.scss";
@import "../scss/_px2px.scss";
.taskbuy {
  font-size: 28px;
  padding: 0 20px;
  textarea {
    border: 1px solid #999;
    margin: 20px;
    width: 300px;
    height: 200px;
    font-size: 28px;
  }
  .base {
    padding: 20px 0 30px;
    line-height: 1.5;
    .red {
      width: 500px;
    }
  }
  .downline {
    text-decoration: #333;
  }
  .tips2 {
    line-height: 1.5;
    font-size: 28px;
  }
  .textcenter {
    padding: 50px 0;
  }
  .tips {
    margin: 10px auto;
    line-height: 38px;
    margin: 30px -20px;
    text-align: center;
  }

  .tips1 {
    margin: 10px auto;
    line-height: 1.8;
    // color: #333;
    font-size: 30px;
  }
  .big {
    font-size: 34px;
    font-weight: bold;
    color: $themeMain;
  }
  .copy-block {
    height: 100px;
    position: relative;
    input {
      position: absolute;
      left: 210px;
    }
    .copy {
      top: 5px;
      position: absolute;
      left: 0;
    }
  }
  .good-block {
    border-top: 1px solid #ebebeb;
    margin: 20px auto 30px;
  }
  .upload-block {
    width: 100%;
    padding: 50px 0;
    text-align: center;
    .upload-img {
      display: inline-block;
      img {
        width: 295px;
        // height: 266px;
        // padding: 100px;
        display: inherit;
        border: 1px solid #999;
      }
      img:first-child {
        margin-right: 80px;
      }
    }
    .upload-img1 img {
      width: 295px;
      height: 295px;
    }
    .upload {
      margin: 10px 80px;
    }
  }
  .update {
    width: 350px;
    float: left;
  }
  .logbtn {
    width: 365px;
  }
  .mtop200 {
    margin-top: 150px;
  }
  .mtop100 {
    margin-top: 100px;
  }
  .bottom {
    text-align: center;
    font-size: 32px;
    position: absolute;
    left: 0;
    right: 0;
    color: #999;
    background-color: #f4f4f8;
    height: 56px;
    padding-top: 20px;
  }
  .orderImg {
    width: 300px;
    height: 240px;
    padding: 40px 0;
  }
  .btn-center {
    text-align: center;
  }
  .longGoodimg {
    width: 700px;
  }
}
</style>