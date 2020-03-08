<template>
  <div class="article-container">
    <vue-markdown :source="content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
import { queryArticle } from '@/api/article';

@Component({
  components: {
    VueMarkdown
  }
})
export default class Article extends Vue {
  private content = '';

  private async mounted() {
    const list = await queryArticle({
      pagesize: 1,
      pagenumber: 1,
      id: this.$route.params['id']
    });
    if (list.items && list.items.length > 0) {
      this.content = list.items[0].content;
    }
  }
}
</script>
