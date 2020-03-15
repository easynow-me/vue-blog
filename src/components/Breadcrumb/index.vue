<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RouteRecord, Route } from 'vue-router';
import * as pathToRegexp from 'path-to-regexp';

@Component
export default class Breadcrumb extends Vue {
  private levelList: RouteRecord[] = [];

  @Watch('$route')
  private onRouteChange(route: Route) {
    if (route.path.startsWith('/redirect/')) {
      return;
    }
    this.getBreadcrumb();
  }

  private created() {
    this.getBreadcrumb();
  }

  private getBreadcrumb() {
    let matched = this.$route.matched.filter(e => e.meta && e.meta.title);
    const first = matched[0];
    if (!this.isDashboard(first)) {
      matched = [
        {
          path: '/dashboard',
          meta: {
            title: this.$t('route.dashboard')
          }
          // tslint:disable-next-line:no-object-literal-type-assertion
        } as RouteRecord
      ].concat(matched);
    }

    this.levelList = matched.filter(
      e => e.meta && e.meta.title && e.meta.breadcrumb !== false
    );
  }
  private isDashboard(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
  }

  private pathCompile(path: string) {
    const { params } = this.$route;
    const toPath = pathToRegexp.compile(path);
    return toPath(params);
  }

  private handleLink(item: RouteRecord) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect as any);
      return;
    }
    this.$router.push(this.pathCompile(path));
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
