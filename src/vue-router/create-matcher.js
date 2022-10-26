"use strict";

import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

// 扁平化传入的options.routes, 创建路由映射表
export default function createMatcher(routes) {
  // 创建路由映射表
  const { pathList, pathMap } = createRouteMap(routes);
  console.log("pathMap:", pathMap);
  console.log("pathList:", pathList);

  // 动态添加 routes
  function addRoutes(routes) {
    const { pathList, pathMap } = createRouteMap(routes, pathList, pathMap);
  }

  // 匹配路径对应的组件
  function match(path) {
    const routeRecord = pathMap[path];
    // const matched = routeRecord ? routeRecord: null;
    if (routeRecord) {
      return createRoute(routeRecord, path);
    }

    // 没有匹配到
    return createRoute(null, path);
  }

  return {
    match,
    addRoutes,
  };
}
