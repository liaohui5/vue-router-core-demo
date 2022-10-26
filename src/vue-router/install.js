"use strict";

import RouterView from "./components/view";
import RouterLink from "./components/link";

// 保存 install 传入的 Vue 并导出
export let _Vue;

/**
 * install 安装插件
 */
export default function install(Vue) {
  _Vue = Vue;
  Vue.mixin({
    beforeCreate() {
      // 1.给所有组件实例混入 $router & $route 属性
      if (this.$options && this.$options.router) {
        this._routerRoot = this; // Vue 根实例
        this._router = this.$options.router; // VueRouter 实例
        this._router.init(this); // 初始化 VueRouter
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent._routerRoot;
      }
    },
  });

  // 将 _router _route (私有属性)代理到 Vue.prototype
  // 简化使用方式, 让所有实例都能直接获取 $router 和 $route
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router;
    },
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route;
    },
  });

  // 注册全局组件 router-view && router-link
  Vue.component("RouterView", RouterView);
  Vue.component("RouterLink", RouterLink);
}
