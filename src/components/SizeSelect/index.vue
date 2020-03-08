<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size === item.value"
        :command="item.value"
        >{{ item.label }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { TagsViewModule, AppModule } from '@/store';

@Component
export default class SizeSelect extends Vue {
  private sizeOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Medium', value: 'medium' },
    { label: 'Small', value: 'small' },
    { label: 'Mini', value: 'mini' }
  ];

  private get size() {
    return AppModule.size;
  }

  private handleSetSize(size: string) {
    // (this as any).$ELEMENT.size = size;
    AppModule.setSize(size);
    this.refreshView();
    this.$message({
      message: 'Switch Size Success',
      type: 'success'
    });
  }

  private refreshView() {
    TagsViewModule.delAllCachedViews();
    const { fullPath } = this.$route;
    this.$nextTick(() => {
      this.$router.replace({
        path: '/redirect' + fullPath
      });
    });
  }
}
</script>
