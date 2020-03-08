<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';
import { AppModule, PermissionModule, SettingsModule } from '@/store';
import * as variables from '@/styles/variables.scss';

@Component({
  components: {
    SidebarItem,
    Logo
  }
})
export default class Sidebar extends Vue {
  private get sidebar() {
    return AppModule.sidebar;
  }

  private get permissionRoutes() {
    return PermissionModule.routes;
  }

  private get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }

  private get showLogo() {
    return SettingsModule.sidebarLogo;
  }

  private get variables() {
    return variables;
  }

  private get isCollapse() {
    return !this.sidebar.opened;
  }
}
</script>
