import { Vue } from 'vue-property-decorator';

/** ElementUI component common definition */
declare class ElementUIComponent extends Vue {
  /** Install component into Vue */
  public static install(vue: typeof Vue): void;
}

// tslint:disable-next-line:max-classes-per-file
declare class ElScrollbar extends ElementUIComponent {
  public native: boolean;
  public wrapStyle: any;
  public wrapClass: any;
  public viewClass: any;
  public viewStyle: any;
  public noresize: boolean;
  public tag: string;
}
