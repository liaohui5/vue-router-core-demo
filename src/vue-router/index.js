"use strict";
import install from "./install";
import createMather from "./create-matcher";
import HashHistory from "./history/hash";

/**
 * 路由器
 */
class VueRouter {
  constructor(options) {
    // 1. 创建路由映射&匹配器
    this.matcher = createMather(options.routes || []);

    // 2. 根据不同模式创建不同的路由器对象(各种跳转方法 push/replace/go/back)
    this.mode = options.mode || "hash";
    this.history = new HashHistory(this);
  }

  // 3. 初始化VueRouter: 根据当前路径显示出对应的组件 & 执行回调监听路径变化 & 更新视图
  init(app) {
    const history = this.history;
    history.transitionTo(history.getCurrentLocation(), history.initEvent);
    history.listen((route) => {
      // 因为 install 的时候定义的 _route 属性是响应式的, 所以需要改变
      // _route 让视图重新渲染(发布订阅模式来做)
      app._route = route;
    });
  }

  // 根据路径匹配对应的组件
  match(path) {
    return this.matcher.match(path);
  }
}

VueRouter.install = install;

export default VueRouter;
