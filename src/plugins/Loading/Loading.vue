<template>
  <div v-if="showing" class="loading">
    <img src="@/assets/imgs/loading.gif" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Loading extends Vue {
  private showing: boolean = false;
  private get iconStyle() {
    return {
      width: '100%',
      height: '100%',
      display: this.showing ? 'block' : 'none',
      animation: this.showing
        ? 'circle_rotating 1.2s linear infinite forwards'
        : 'none',
    };
  }
  public show(state:boolean) {
    this.showing = state;
  }
}
</script>
<style lang="scss" scoped>
@import '../../scss/theme.scss';
@import '../../scss/_px2px.scss';

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $themeMain;
  width: 64px;
  height: 64px;
}
</style>

