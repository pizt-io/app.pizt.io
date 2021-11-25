import { RouteRecordRaw } from "vue-router";
import Page from "./page.vue";

export const sandboxRoute: RouteRecordRaw = {
  path: "/sandbox",
  name: "sandbox",
  component: Page,
};
