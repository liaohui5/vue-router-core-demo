"use strict";

import createRouteMap from "./create-route-map";
import { createRoute } from "./history/base";

// 扁平化传入的options.routes, 创建路由映射表
export default function createMatcher(routes) {
  // 1.创建路由映射表
  const { pathList, pathMap } = createRouteMap(routes);
  console.log("pathMap:", pathMap);
  console.log("pathList:", pathList);

  // 2.创建动态添加 routes 的方法 addRoutes
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap);
  }

  // 3.匹配路径对应的组件
  function match(path) {
    const routeRecord = pathMap[path] || null;
    return createRoute(routeRecord, path);
  }

  return {
    match,
    addRoutes,
  };
}
