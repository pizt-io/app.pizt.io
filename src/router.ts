import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { appRoute } from '@modules/app';
import { homeRoute } from '@modules/home';

const routes: Array<RouteRecordRaw> = [
  appRoute,
  homeRoute,
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
