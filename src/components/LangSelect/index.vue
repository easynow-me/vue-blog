<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh-CN"
        >中文</el-dropdown-item
      >
      <el-dropdown-item :disabled="language === 'en'" command="en"
        >English</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store';
@Component
export default class LangSelect extends Vue {
  private get language() {
    return AppModule.language;
  }

  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang;
    AppModule.setLanguage(lang);
    this.$message({
      message: this.$t('langSelect.switchSuccess') as string,
      type: 'success'
    });
  }
}
</script>
