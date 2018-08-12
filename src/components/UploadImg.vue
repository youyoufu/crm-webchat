<template>

  <div class="update">
    <!-- 通过input获取文件 ，为了美观使用v-show="false" 将input隐藏 通过input的change事件绑定fileChange-->

    <input :sequence="sequence" :id="taskOrderId" type="file" v-show="false" accept="image" ref="input" @change="fileChange($event.target.files)">
    <!-- 通过$refs操作input的点击事件，调起文件选择 -->
    <span class="upload" @click="$refs.input.click()">
      <!-- 通过slot内容分发将头像的显示交给父组件,父组件可以自定义图片样式 -->
      <!-- <slot>
      </slot> -->
      {{text}}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { setUploadImg } from "@/api/upload";
@Component({})
export default class UploadImg extends Vue {
  @Prop() private text!: string;
  @Prop() private taskOrderId!: string;
  @Prop() private sequence!: string;
  @Prop() private keyName!: string;

  private fileChange(files: any) {
    this.$loading(true);
    setUploadImg(files, this.taskOrderId.toString(), this.sequence)
      .then(result => {
        let url = result.data.url;
        let status = result.data.status;
        let keyName = this.keyName;
        this.$emit("fileChange", { url, keyName, status }, "");
        this.$loading(false);
      })
      .catch((err: { message: string }) => {
        this.$emit("fileChange", null, err.message);
        this.$toast("验证不通过");
        this.$loading(false);
      });
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/theme.scss";
</style>

