<template>
  <div class="home-container">
    <ul>
      <li v-for="article in articleList.items" v-bind:key="article.id">
        <router-link :to="'/article/' + article.id">
          {{ article.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { queryArticle, PagedList } from '@/api/article';
import { ArticleReply } from '@/protos/article_pb';

@Component
export default class Home extends Vue {
  private articleList: PagedList<ArticleReply.AsObject> = {
    items: [],
    pageNumber: 1,
    pageSize: 1
  };

  private async mounted() {
    this.articleList = await queryArticle({
      pagesize: 20,
      pagenumber: 1,
      id: ''
    });
  }
}
</script>
