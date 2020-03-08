import { DeviceType } from '@/store/modules/app';
import { AppModule } from '@/store';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FixiOSBugMixin extends Vue {
  private get device() {
    return AppModule.device;
  }

  private mounted() {
    this.fixBugIniOS();
  }

  private fixBugIniOS() {
    const $subMenu = this.$refs.$subMenu;
    if ($subMenu) {
      const handleMouseleave = ($subMenu as any).handleMouseleave;
      ($subMenu as any).handleMouseleave = (e: any) => {
        if (this.device === DeviceType.Mobile) {
          return;
        }
        handleMouseleave(e);
      };
    }
  }
}
