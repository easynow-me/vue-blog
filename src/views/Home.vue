<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <el-button>abc</el-button>
    <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import VueMarkdown from 'vue-markdown';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    HelloWorld,
    VueMarkdown
  }
})
export default class Home extends Vue {}
</script>
