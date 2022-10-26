"use strict";
import History from "./base";

// 获取当前 hash
function getHash() {
  return window.location.hash.slice(1);
}

// 初始化hash, 确保一进入就有path
function initHash() {
  if (!window.location.hash) {
    window.location.hash = "/";
  }
}

export default class HashHistory extends History {
  constructor(router) {
    super(router);
    initHash();
    this.initEvent = this.initEvent.bind(this);
  }

  getCurrentLocation() {
    return getHash();
  }

  initEvent() {
    window.addEventListener("hashchange", () => {
      console.log("hashchange:", this);
      this.transitionTo(this.getCurrentLocation());
    });
  }
}
