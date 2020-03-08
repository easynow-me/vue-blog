<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link :to="to" v-else>
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Vue, Prop } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate';

export default class Link extends Vue {
  @Prop({ required: true }) public to!: string;
  private isExternal(path: string): boolean {
    return isExternal(path);
  }
}
</script>
