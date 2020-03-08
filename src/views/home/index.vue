<template>
  <div class="dashboard-container">
    <ul>
      <li v-for="article in articleList.items" v-bind:key="article.title">
        {{ article.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { queryArticle, PagedList } from '@/api/article';
import { ArticleDto } from '@/protos/article_pb';

@Component
export default class Home extends Vue {
  private articleList: PagedList<ArticleDto.AsObject> = {
    items: [],
    pageNumber: 1,
    pageSize: 1
  };

  private async mounted() {
    this.articleList = await queryArticle({
      pagesize: 1,
      pagenumber: 1
    });
  }
}
</script>
