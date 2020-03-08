<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d'
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { SettingsModule } from '@/store';

import pkg from 'element-ui/package.json';
// tslint:disable-next-line: no-string-literal
const version = pkg['version'];
const ORIGINAL_THEME = '#409EFF';

@Component
export default class ThemePicker extends Vue {
  private chalk = '';
  private theme = '';

  private get defaultTheme() {
    return SettingsModule.theme;
  }

  @Watch('defaultTheme', { immediate: true })
  private onDefaultThemeChange(val: string) {
    this.theme = val;
  }

  @Watch('theme')
  private async onThemeChange(val: string) {
    const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
    const themeCluster = this.getThemeCluster(val.replace('#', ''));
    const originalCluster = this.getThemeCluster(oldVal.replace('#', ''));

    const $message = this.$message({
      message: this.$t('themePicker.compilingTheTheme') as string,
      customClass: 'theme-message',
      type: 'success',
      duration: 0,
      iconClass: 'el-icon-loading'
    });

    const getHandler = (variable: string, id: string) => {
      return () => {
        const oriCluster = this.getThemeCluster(
          ORIGINAL_THEME.replace('#', '')
        );
        const newStyle = this.updateStyle(
          (this as any)[variable],
          oriCluster,
          themeCluster
        );

        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.setAttribute('id', id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };

    if (!this.chalk) {
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      await this.getCSSString(url, 'chalk');
    }

    const chalkHandler = getHandler('chalk', 'chalk-style');

    chalkHandler();

    const styles = [].slice
      .call(document.querySelectorAll('style'))
      .filter((style: HTMLElement) => {
        const text = style.innerText;
        return (
          new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        );
      });

    styles.forEach((style: HTMLElement) => {
      const { innerText } = style;
      if (typeof innerText !== 'string') {
        return;
      }
      style.innerText = this.updateStyle(
        innerText,
        originalCluster,
        themeCluster
      );
    });

    this.$emit('change', val);
    $message.close();
  }

  private updateStyle(
    style: string,
    oldCluster: string[],
    newCluster: string[]
  ) {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
    });
    return newStyle;
  }

  private getCSSString(url: string, variable: string) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        // tslint:disable-next-line: no-magic-numbers
        if (xhr.readyState === 4 && xhr.status === 200) {
          (this as any)[variable] = xhr.responseText.replace(
            /@font-face{[^}]+}/,
            ''
          );
          resolve();
        }
      };
      xhr.open('GET', url);
      xhr.send();
    });
  }

  private getThemeCluster(theme: string) {
    const tintColor = (color: string, tint: number) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      if (tint === 0) {
        return [red, green, blue].join(',');
      } else {
        // tslint:disable-next-line: no-magic-numbers
        red += Math.round(tint * (255 - red));
        // tslint:disable-next-line: no-magic-numbers
        green += Math.round(tint * (255 - green));
        // tslint:disable-next-line: no-magic-numbers
        blue += Math.round(tint * (255 - blue));

        // tslint:disable-next-line: no-magic-numbers
        return `#${red.toString(16)}${green.toString(
          // tslint:disable-next-line: no-magic-numbers
          16
          // tslint:disable-next-line: no-magic-numbers
        )}${blue.toString(16)}`;
      }
    };

    const shadeColor = (color: string, shade: number) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);

      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);

      // tslint:disable-next-line: no-magic-numbers
      return `#${red.toString(16)}${green.toString(16)}${blue.toString(
        // tslint:disable-next-line: no-magic-numbers
        16
      )}`;
    };

    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    // tslint:disable-next-line: no-magic-numbers
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
