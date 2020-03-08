import { Route } from 'vue-router';
import {
  Action,
  Module,
  VuexModule,
  MutationAction
} from 'vuex-module-decorators';

export interface ITagsViewState {
  visitedViews: Route[];
  cachedViews: string[];
}

@Module({ name: 'tagsView' })
export class TagsView extends VuexModule implements ITagsViewState {
  public visitedViews = new Array<Route>();
  public cachedViews = new Array<string>();

  @Action
  public addView(view: Route) {
    this.addVisitedView(view);
    this.addCachedView(view);
  }

  @MutationAction({ mutate: ['visitedViews'] })
  public addVisitedView(view: Route) {
    const views = (this.state as ITagsViewState).visitedViews;
    if (!views.some(v => v.path === view.path)) {
      views.push({
        path: view.path,
        name: view.name,
        hash: view.hash,
        query: view.query,
        params: view.params,
        fullPath: view.fullPath,
        matched: [],
        redirectedFrom: view.redirectedFrom,
        meta: view.meta
      });
    }

    return Promise.resolve({
      visitedViews: views
    });
  }

  @MutationAction({ mutate: ['cachedViews'] })
  public addCachedView(view: Route) {
    const views = (this.state as ITagsViewState).cachedViews;
    if (
      view.name !== undefined &&
      view.name !== null &&
      !views.includes(view.name) &&
      !view.meta.noCache
    ) {
      views.push(view.name);
    }
    return Promise.resolve({
      cachedViews: views
    });
  }

  @Action
  public delView(view: Route): Promise<ITagsViewState> {
    return new Promise(resolve => {
      this.delVisitedView(view);
      this.delCachedView(view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @MutationAction({ mutate: ['visitedViews'] })
  public delVisitedView(view: Route) {
    const views = (this.state as ITagsViewState).visitedViews;
    for (const [i, v] of views.entries()) {
      if (v.path === view.path) {
        views.splice(i, 1);
        break;
      }
    }

    return Promise.resolve({
      visitedViews: views
    });
  }

  @MutationAction({ mutate: ['cachedViews'] })
  public delCachedView(view: Route) {
    const views = (this.state as ITagsViewState).cachedViews;
    for (const i of views) {
      if (i === view.name) {
        const index = views.indexOf(i);
        views.splice(index, 1);
        break;
      }
    }
    return Promise.resolve({
      cachedViews: views
    });
  }

  @Action
  public delOthersViews(view: Route): Promise<ITagsViewState> {
    return new Promise(resolve => {
      this.delOthersVisitedViews(view);
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @MutationAction({ mutate: ['visitedViews'] })
  public delOthersVisitedViews(view: Route) {
    let views = (this.state as ITagsViewState).visitedViews;
    views = views.filter(v => {
      return v.meta.affix || v.path === view.path;
    });
    return Promise.resolve({
      visitedViews: views
    });
  }

  @Action
  public delAllViews(): Promise<ITagsViewState> {
    return new Promise(resolve => {
      this.delAllVisitedViews();
      this.delAllCachedViews();
      resolve({
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews]
      });
    });
  }

  @Action
  public updateVisitedView(view: Route) {
    for (let v of this.visitedViews) {
      if (v.path === view.path) {
        v = { ...v, ...view };
        break;
      }
    }
    return view;
  }

  @MutationAction({ mutate: ['visitedViews'] })
  public delAllVisitedViews() {
    const views = (this.state as ITagsViewState).visitedViews;
    const affixTags = views.filter(tag => tag.meta.affix);
    return Promise.resolve({
      visitedViews: affixTags
    });
  }

  @MutationAction({ mutate: ['cachedViews'] })
  public delAllCachedViews() {
    return Promise.resolve({
      cachedViews: []
    });
  }
}
