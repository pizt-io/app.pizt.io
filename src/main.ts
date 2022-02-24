import "virtual:windi.css";

import "./core/styles/all.scss";

import Root from "./Root.vue";

import { createApp } from "vue";

import { store } from "./store";
import { router } from "./router";
import { i18nPlugin } from "./core/plugins/i18n";

import { registerSW } from "virtual:pwa-register";
import { supabase } from "@/core/plugins/supabase";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateSW = registerSW({
  onNeedRefresh() {
    // eslint-disable-next-line no-console
    console.log("Need Refresh");
  },
  onOfflineReady() {
    // eslint-disable-next-line no-console
    console.log("Offline");
  },
});

createApp(Root).use(store).use(router).use(i18nPlugin).mount("#app");

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
    store.commit("SET_USER_SESSION", session);
  }
});
