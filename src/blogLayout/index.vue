<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
  </div>
</template>

<script lang="ts">
import RightPanel from '@/components/RightPanel/index.vue';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import ResizeMixin from '@/components/mixin/ResizeHandler';
import { AppModule, SettingsModule } from '@/store';
import { DeviceType } from '@/store/modules/app';

@Component({
  components: {
    RightPanel
  }
})
export default class BlogLayout extends mixins(ResizeMixin) {
  private get showSettings() {
    return SettingsModule.showSettings;
  }
  private get needTagsView() {
    return SettingsModule.tagsView;
  }
  private get fixedHeader() {
    return SettingsModule.fixedHeader;
  }
  private get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    };
  }

  private handleClickOutside() {
    AppModule.closeSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
