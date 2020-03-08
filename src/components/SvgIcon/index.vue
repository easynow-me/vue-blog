<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate';

@Component
export default class SvgIcon extends Vue {
  @Prop({ required: true }) public iconClass!: string;
  @Prop({ default: '' }) public className!: string;

  private get isExternal() {
    return isExternal(this.iconClass);
  }

  private get iconPath() {
    let icon = require(`@/icons/svg/${this.iconClass}.svg`);
    if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
      icon = icon.default;
    }
    return icon.url;
  }
  private get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  }

  private get styleExternalIcon() {
    return {
      mask: `url(${this.iconClass}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
    };
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
