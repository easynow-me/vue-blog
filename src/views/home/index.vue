<template>
  <div class="home-container">
    <el-card
      v-for="article in articleList.items"
      v-bind:key="article.id"
      shadow="hover"
      class="card"
    >
      <router-link :to="'/article/' + article.id">
        <div>
          <span>{{ article.title }}</span>
          <div class="bottom clearfix">
            <span class="content">{{
              md2Text(article.content).substring(0, 200)
            }}</span>
            <time class="createtime">{{ article.createtime }}</time>
          </div>
        </div>
      </router-link>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { queryArticle, PageList } from '@/api/article';
import { ArticleReply } from '@/protos/article_pb';
import { md2Text } from '@/utils';

@Component
export default class Home extends Vue {
  private articleList: PageList<ArticleReply.AsObject> = {
    items: [],
    pageNumber: 1,
    pageSize: 1
  };

  private md2Text = md2Text;

  private async mounted() {
    this.articleList = await queryArticle({
      pagesize: 20,
      pagenumber: 1,
      id: ''
    });
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
}
.content {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.createtime {
  font-size: 13px;
  padding: 0;
  float: right;
}
</style>
