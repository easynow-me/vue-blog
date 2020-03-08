<script lang="ts">
import { CreateElement, RenderContext } from 'vue';
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h: CreateElement, context: RenderContext) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      vnodes.push(
        h('svg-icon', {
          attrs: {
            'icon-class': icon
          }
        })
      );
    }

    if (title) {
      const slots = context.slots();
      let children = slots.title;
      if (!children) {
        children = title;
      }
      vnodes.push(h('span', children));
    }
    return vnodes;
  }
};
</script>
