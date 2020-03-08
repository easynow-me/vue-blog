<template>
  <div>
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import screenfull from 'screenfull';

@Component
export default class Screenfull extends Vue {
  private isFullscreen = false;

  private mounted() {
    this.init();
  }

  private beforeDestroy() {
    this.destroy();
  }

  private click() {
    if (!screenfull.isEnabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      });
      return false;
    }
    // tslint:disable-next-line:no-unused-expression
    screenfull.isEnabled && screenfull.toggle();
  }

  private init() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.change);
    }
  }

  private change() {
    if (screenfull.isEnabled) {
      this.isFullscreen = screenfull.isFullscreen;
    }
  }

  private destroy() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.change);
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
