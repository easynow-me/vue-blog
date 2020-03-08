<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      :placeholder="$t('headerSearch.tip')"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Fuse from 'fuse.js';
import path from 'path';
import { PermissionModule } from '@/store';
import { RouteConfig } from 'vue-router';

@Component
export default class HeaderSearch extends Vue {
  private search = '';
  private options: any[] = [];
  private fuse!: Fuse<any, Fuse.FuseOptions<any>>;
  private searchPool: any[] = [];
  private show = false;

  private get routes() {
    return PermissionModule.routes;
  }

  @Watch('routes')
  private onRoutesChange() {
    this.searchPool = this.generateRoutes(this.routes);
  }

  @Watch('searchPool')
  private onSearchPoolChange(list: any[]) {
    this.initFuse(list);
  }
  @Watch('show')
  private onShowChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.close);
    } else {
      document.body.removeEventListener('click', this.close);
    }
  }

  private mounted() {
    this.searchPool = this.generateRoutes(this.routes);
  }

  private click() {
    this.show = !this.show;
    if (this.show) {
      // tslint:disable-next-line:no-unused-expression
      this.$refs.headerSearchSelect &&
        (this.$refs.headerSearchSelect as HTMLElement).focus();
    }
  }

  private close() {
    // tslint:disable-next-line:no-unused-expression
    this.$refs.headerSearchSelect &&
      (this.$refs.headerSearchSelect as HTMLElement).blur();
    this.options = [];
    this.show = false;
  }

  private change(val: any) {
    this.$router.push(val.path);
    this.search = '';
    this.options = [];
    this.$nextTick(() => {
      this.show = false;
    });
  }

  private initFuse(list: any[]) {
    this.fuse = new Fuse(list, {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'title',
          weight: 0.7
        },
        {
          name: 'path',
          weight: 0.3
        }
      ]
    });
  }

  private generateRoutes(
    routes: RouteConfig[],
    basePath = '/',
    prefixTitle: string[] = []
  ): any[] {
    let res: any[] = [];
    for (const router of routes) {
      if (router.meta && router.meta.hidden) {
        continue;
      }
      const data = {
        path: path.resolve(basePath, router.path),
        title: [...prefixTitle]
      };

      if (router.meta && router.meta.title) {
        data.title = [...data.title, router.meta.title];

        if (router.redirect !== 'noRedirect') {
          res.push(data);
        }
      }

      if (router.children) {
        const tempRoutes = this.generateRoutes(
          router.children,
          data.path,
          data.title
        );
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes];
        }
      }
    }
    return res;
  }

  private querySearch(query: string) {
    if (query !== '') {
      this.options = this.fuse.search(query);
    } else {
      this.options = [];
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    >>> .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
