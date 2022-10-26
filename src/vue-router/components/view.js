"use strict";

// 函数式组件: https://v2.cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
export default {
  functional: true,
  name: "RouterView",
  props: {
    name: {
      type: String,
      default: "default",
    },
  },
  render(h, ctx) {
    let { parent, data } = ctx;
    data.isRouterViewComponent = true; // 标识当前组件是 router-view
    const route = parent.$route; // router.history.current

    let depth = 0; // 当前 router-view 的嵌套层级
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.isRouterViewComponent) {
        // 证明父级有一个 router-view 组件
        depth++;
      }
      parent = parent.$parent; // 父组件的父组件
    }

    const record = route.matched[depth];
    if (!record) {
      return h(); // 如果 Route.matched 没有任何一条 RouteRecord, 渲染空
    }

    return h(record.component, data);
  },
};
