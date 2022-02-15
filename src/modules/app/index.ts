import { RouteRecordRaw } from "vue-router";
import Page from "./page.vue";

export const appRoute: RouteRecordRaw = {
  path: "/app",
  name: "app",
  component: Page,
};
