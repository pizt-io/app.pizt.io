import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { appRoute } from "@modules/app";
import { homeRoute } from "@modules/home";
import { sandboxRoute } from "@modules/sandbox";

const routes: Array<RouteRecordRaw> = [appRoute, homeRoute, sandboxRoute];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
