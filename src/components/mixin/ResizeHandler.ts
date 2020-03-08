import { DeviceType } from '@/store/modules/app';
import { AppModule } from '@/store';
import { Component, Vue, Watch } from 'vue-property-decorator';

const { body } = document;
const WIDTH = 992;

@Component
export default class ResizeHandlerMixin extends Vue {
  protected get device() {
    return AppModule.device;
  }

  protected get sidebar() {
    return AppModule.sidebar;
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      AppModule.closeSideBar(false);
    }
  }

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  private beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  private mounted() {
    const isMobile = this.isMobile();
    if (isMobile) {
      AppModule.toggleDevice(DeviceType.Mobile);
      AppModule.closeSideBar(true);
    }
  }

  private isMobile(): boolean {
    const rect = body.getBoundingClientRect();
    return rect.width - 1 < WIDTH;
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      AppModule.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);

      if (isMobile) {
        AppModule.closeSideBar(true);
      }
    }
  }
}
