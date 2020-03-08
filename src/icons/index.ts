import SvgIcon from '@/components/SvgIcon/index.vue';
import Vue from 'vue';

Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
