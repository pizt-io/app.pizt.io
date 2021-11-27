import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
