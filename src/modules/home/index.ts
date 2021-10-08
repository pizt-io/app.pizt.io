import { RouteRecordRaw } from 'vue-router';
import Page from "./page.vue";

export const homeRoute: RouteRecordRaw = {
  path: "/",
  name: "home",
  component: Page,
}
