"use strict";

class Route {
  constructor(path, matched) {
    this.path = path;
    this.matched = matched || [];
  }
}

// 创建路径对应匹配到的组件对象
export function createRoute(record, path) {
  const matchedRecords = [];
  if (record) {
    // 如果 record 为真肯定是 RouteRecord 实例对象
    // 无法匹配到 record 肯定是 null, 循环终止
    while (record) {
      matchedRecords.unshift(record);
      record = record.parent;
    }
  }
  return new Route(path, matchedRecords);
}

// history基类
export default class History {
  constructor(router) {
    // VueRouter instance
    this.router = router;

    // 默认存储一个当前路径, 方便后续更改
    this.current = createRoute(null, "/");

    // 更新 current 时候应该重新渲染(调用重新渲染回调)
    this.reRenderCallback = null;
  }

  // 根据 path 找到对应的 route(/about/a: Route), 然后执行回调
  transitionTo(path, onCompleteCallback) {
    const route = this.router.match(path);

    // 更新 current: 对比和匹配到的Route和原来不一样才更新
    if (
      route.path === this.current.path &&
      route.matched.length === this.current.matched.length
    ) {
      return;
    }
    this.updateCurrentRoute(route);
    typeof onCompleteCallback === "function" && onCompleteCallback();
  }

  // 更新 current && 重新渲染视图
  updateCurrentRoute(route) {
    this.current = route;
    console.log("this.current:", this.current);
    typeof this.reRenderCallback === "function" && this.reRenderCallback(route);
  }

  // 监听 current 变化
  listen(reRenderCallback) {
    this.reRenderCallback = reRenderCallback;
  }
}
