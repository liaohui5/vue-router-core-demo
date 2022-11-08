"use strict";
let _Vue;

/**
 * 路由器
 */
class VueRouter {
  constructor(options) {
    this.options = options;
    this.mode = options.mode || "hash";
    this.routes = options.routes || [];
    this.routeInfo = new RouteInfo(); // 2. 创建当前路由信息
    this.routesMap = createRouteMap(this.routes); // 3. 创建路由和组件映射对象
    initDefaultRouteInfo(this); // 4. 初始化默认信息,监听 hash/history 变化
    initComponents(); // 5.注册全局组件 router-view & router-link
  }
}

/**
 * 提供安装插件的方法
 */
VueRouter.install = function (Vue) {
  _Vue = Vue;
  Vue.mixin({
    beforeCreate() {
      // 1.给所有组件实例混入 $router & $route 属性
      if (this.$options && this.$options.router) {
        this.$router = this.$options.router;
        // 由于 window.onload 事件还没有触发, router-view 已经
        // render 了, 就会导致默认不会匹配到&渲染出任何组件
        // 所以 必须要是响应式的数据才能让当前路由信息变化时
        // 匹配 & 渲染出对应的组件
        Vue.util.defineReactive(this, "$router", this.$router);
        this.$route = this.$router.routeInfo;
      } else {
        this.$router = this.$parent.$router;
        this.$route = this.$parent.$route;
      }
    },
  });
};

/**
 * 路由信息类: 保存当前路由的路径
 */
class RouteInfo {
  constructor() {
    this.currentPath = null;
  }
}

/**
 * 路径和组件的映射
 * {路径:组件}
 */
function createRouteMap(routes) {
  return routes.reduce((map, item) => {
    map[item.path] = item.component;
    return map;
  }, Object.create(null));
}

/**
 * 初始化默认信息
 * 监听url地址变化
 */
function initDefaultRouteInfo(router) {
  if (router.mode === "hash") {
    if (!location.hash) {
      location.hash = "/";
    }
    // 设置 hash 路径
    function setHashPath() {
      router.routeInfo.currentPath = location.hash.slice(1);
    }
    window.addEventListener("load", setHashPath, false);
    window.addEventListener("hashchange", setHashPath, false);
  } else {
    if (!location.pathname) {
      location.pathname = "/";
    }
    // 设置 history 路径
    function setHistoryPath() {
      router.routeInfo.currentPath = location.pathname;
    }
    window.addEventListener("load", setHistoryPath, false);
    window.addEventListener("popstate", setHistoryPath, false);
  }
}

/**
 * 注册全局 router-link & router-view 组件
 */
function initComponents() {
  const Vue = _Vue;
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      const vm = this._self;
      const to = vm.$router.mode === "hash" ? `#${vm.to}` : vm.to;
      return h("a", { attrs: { href: to } }, this.$slots.default);
    },
  });

  Vue.component("router-view", {
    render(h) {
      const router = this._self.$router;
      const component = router.routesMap[router.routeInfo.currentPath];
      console.log("[matched component]:", component);
      return h(component);
    },
  });
}

export default VueRouter;
