<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.meta.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        {{ $t('tagsView.refresh') }}
      </li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >
        {{ $t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags(selectedTag)">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ScrollPane from './ScrollPane.vue';
import { TagsViewModule, PermissionModule } from '@/store';
import path from 'path';
import { RouteConfig, Route } from 'vue-router';

@Component({
  components: {
    ScrollPane
  }
})
export default class TagsView extends Vue {
  private visible = false;
  private top = 0;
  private left = 0;
  // tslint:disable-next-line:no-object-literal-type-assertion
  private selectedTag = {} as Route;
  private affixTags: Route[] = new Array<Route>();

  private get visitedViews() {
    return TagsViewModule.visitedViews;
  }

  private get routes() {
    return PermissionModule.routes;
  }

  @Watch('$route')
  private onRouteChange() {
    this.addTags();
    this.moveToCurrentTag();
  }

  @Watch('visible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu);
    } else {
      document.body.removeEventListener('click', this.closeMenu);
    }
  }

  private mounted() {
    this.initTags();
    this.addTags();
  }

  private isActive(route: Route) {
    return route.path === this.$route.path;
  }

  private filterAffixTags(routes: RouteConfig[], basePath = '/') {
    let tags = new Array<Route>();
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
          hash: '',
          query: {},
          params: {},
          matched: []
        });
      }
      if (route.children) {
        const tempTags = this.filterAffixTags(route.children, route.path);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    });
    return tags;
  }
  private initTags() {
    const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
    for (const tag of affixTags) {
      if (tag.name) {
        TagsViewModule.addVisitedView(tag);
      }
    }
  }
  private addTags() {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route);
    }
    return false;
  }
  private moveToCurrentTag() {
    const tags = this.$refs.tag as Vue[];
    this.$nextTick(() => {
      for (const tag of tags) {
        if ((tag as any).to.path === this.$route.path) {
          (this.$refs.scrollPane as ScrollPane).moveToTarget(tag);
          if ((tag as any).to.fullPath !== this.$route.fullPath) {
            TagsViewModule.updateVisitedView(this.$route);
          }
          break;
        }
      }
    });
  }
  private refreshSelectedTag(view: Route) {
    TagsViewModule.delCachedView(view).then(() => {
      const { fullPath } = view;
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        });
      });
    });
  }
  private closeSelectedTag(view: Route) {
    TagsViewModule.delView(view).then(({ visitedViews }) => {
      if (this.isActive(view)) {
        this.toLastView(visitedViews, view);
      }
    });
  }
  private closeOthersTags() {
    this.$router.push(this.selectedTag as RouteConfig);
    TagsViewModule.delOthersViews(this.selectedTag).then(() => {
      this.moveToCurrentTag();
    });
  }
  private closeAllTags(view: Route) {
    TagsViewModule.delAllViews().then(({ visitedViews }) => {
      if (this.affixTags.some(tag => tag.path === view.path)) {
        return;
      }
      this.toLastView(visitedViews, view);
    });
  }
  private toLastView(visitedViews: Route[], view: Route) {
    const lastestView = visitedViews.slice(-1)[0] as RouteConfig;
    if (lastestView) {
      this.$router.push(lastestView);
    } else {
      if (view.name === 'Dashboard') {
        this.$router.replace({
          path: '/redirect' + view.fullPath
        });
      } else {
        this.$router.push('/');
      }
    }
  }
  private openMenu(tag: Route, e: MouseEvent) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left;
    const offsetWidth = (this.$el as HTMLElement).offsetWidth;
    const maxLeft = offsetWidth - menuMinWidth;
    // tslint:disable-next-line: no-magic-numbers
    const left = e.clientX - offsetLeft + 15;
    this.left = left > maxLeft ? maxLeft : left;
    this.top = e.clientY;
    this.visible = true;
    this.selectedTag = tag;
  }
  private closeMenu() {
    this.visible = false;
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
