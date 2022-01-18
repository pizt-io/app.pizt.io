import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { appRoute } from "@modules/app";
import { homeRoute } from "@modules/home";
import { sandboxRoute } from "@modules/sandbox";
import { profileRoute } from "./modules/profile";
import { communityRoute } from "./modules/community";

const routes: Array<RouteRecordRaw> = [
  appRoute,
  homeRoute,
  sandboxRoute,
  profileRoute,
  communityRoute,
];

// See more at: https://next.router.vuejs.org/guide/essentials/history-mode.html#html5-mode
export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
