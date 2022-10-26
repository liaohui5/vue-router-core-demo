"use strict";
import VueRouter from "@/vue-router";
// import VueRouter from "vue-router";
import Vue from "vue";
import Home from "%/Home.vue";
import About from "%/About.vue";

Vue.use(VueRouter);


// 创建测试组件
const createTestComponent = (text) => {
  return {
    render(h) {
      return h("h1", text);
    },
  };
};

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
    children: [
      {
        path: "a",
        component: createTestComponent("about-aaa"),
      },
      {
        path: "b",
        component: createTestComponent("about-bbbb"),
      },
    ],
  },
];

export default new VueRouter({
  mode: "hash",
  routes,
});
