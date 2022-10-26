"use strict";

// 路由记录
class RouteRecord {
  constructor(path, component, parent) {
    this.path = path;
    this.component = component;
    this.parent = parent;
  }
}

// 创建映射记录
function addRouteRecord(route, pathList, pathMap, parent = null) {
  const { path, component, children } = route;
  // 如果是二级路由应该带上父级路由的路径 /about/a, 否则路径会变成 a
  const fullPath = parent ? `${parent.path}/${path}` : path;
  const record = new RouteRecord(fullPath, component, parent);
  if (!pathMap[path]) {
    pathList.push(fullPath);
    pathMap[fullPath] = record;
  }
  if (children && children.length) {
    children.forEach((childRoute) => {
      addRouteRecord(childRoute, pathList, pathMap, record);
    });
  }
}

// 格式化传入的参数
// 创建路由映射表, 返回 pathList, pathMap
// pathList: ['/', '/home', '/about', '/about/a', '/about/b']
// pathMap:  { '/': App, '/home': Home, '/about': About ... }
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  let pathList = oldPathList || [];
  let pathMap = oldPathMap || Object.create(null);

  routes.forEach((routeItem) => {
    addRouteRecord(routeItem, pathList, pathMap);
  });

  return {
    pathList,
    pathMap,
  };
}
