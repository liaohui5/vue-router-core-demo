"use strict";

export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
    },
  },
  render(h) {
    const vm = this._self;
    const to = vm.$router.mode === "hash" ? `#${vm.to}` : vm.to;
    return h("a", { attrs: { href: to } }, this.$slots.default);
  },
};
