<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t('settings.title') }}</h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.tagsView') }}</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.sidebarLogo') }}</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ThemePicker from '@/components/ThemePicker/index.vue';
import { SettingsModule } from '@/store';

@Component({
  components: {
    ThemePicker
  }
})
export default class Settings extends Vue {
  private get fixedHeader() {
    return SettingsModule.fixedHeader;
  }

  private set fixedHeader(val) {
    SettingsModule.changeSetting({
      fixedHeader: val
    });
  }

  private get tagsView() {
    return SettingsModule.tagsView;
  }

  private set tagsView(val) {
    SettingsModule.changeSetting({
      tagsView: val
    });
  }

  private get sidebarLogo() {
    return SettingsModule.sidebarLogo;
  }

  private set sidebarLogo(val) {
    SettingsModule.changeSetting({
      sidebarLogo: val
    });
  }

  private themeChange(val: string) {
    SettingsModule.changeSetting({
      theme: val
    });
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
