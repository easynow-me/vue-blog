<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component
export default class Redirect extends Vue {
  private created() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: '/' + path, query });
  }
  private render(h: CreateElement) {
    return h();
  }
}
</script>
