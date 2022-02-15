import { RouteRecordRaw } from "vue-router";
import Page from "./page.vue";

export const profileRoute: RouteRecordRaw = {
  path: "/profile",
  name: "profile",
  component: Page,
};
