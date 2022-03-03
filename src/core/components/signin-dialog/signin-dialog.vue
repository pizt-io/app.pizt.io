<template>
  <el-dialog
    v-model="isVisible"
    center
    fullscreen
    append-to-body
    destroy-on-close
    :show-close="false"
    :custom-class="$style.signinDialogWrapper"
  >
    <div :class="$style.signinDialogLeft">
      <h2 :class="$style.signinDialogTitle">
        Please sign in to <u>save your work</u> and use the SVG Animator ✨
      </h2>
      <button :class="$style.signinBtn" @click="handleSigninGithub">
        <img class="inline-block h-6 w-auto mr-3" src="/img/github.png" alt="Github" />
        <span>Sign in with Github</span>
      </button>
      <span :class="$style.signinCancel" @click="handleSigninCancel">
        <span>Or use the app without signing in</span> 🥺
      </span>
    </div>
    <div :class="$style.signinDialogRight">
      <div :class="$style.signinDialogTitle">
        <div><b>&lt;pizt.io /&gt;</b></div>
        <div>An animation generator for <u>developers</u></div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { APP_MODE } from "@core/constants/navigator";
import { useAppMode } from "@/modules/app/use/useAppMode";
import { supabase } from "@/core/plugins/supabase";
import { useStore } from "vuex";
import { RootState } from "@/store/state";

export default defineComponent({
  setup() {
    const store = useStore<RootState>();

    const isVisible = ref(false);
    const hide = () => {
      isVisible.value = false;
    };
    const show = () => {
      isVisible.value = true;
    };

    const { appMode, changeAppMode } = useAppMode();

    const handleSigninCancel = () => {
      changeAppMode(APP_MODE.MAIN);
      hide();
    };
    const handleSigninGithub = async () => {
      const { session } = await supabase.auth.signIn({
        // provider can be 'github', 'google', 'gitlab', and more
        provider: "github",
      });

      store.commit("SET_USER_SESSION", session);
      hide();
    };

    const currentUser = computed(() => store.state.userSession?.user);

    onMounted(() => {
      if (!currentUser.value) {
        show();
      }
    });

    const forceSignin = () => {
      if (!currentUser.value && appMode.value === APP_MODE.SVG) {
        show();
      }
    };

    watch(appMode, forceSignin, { immediate: true });

    return {
      isVisible,
      handleSigninGithub,
      handleSigninCancel,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.signinDialogWrapper {
  :global {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;

      @include size(100%);
      @include flexBox();
    }
  }
}
.signinDialogLeft {
  flex: 1;
  background-color: color();

  @include flexCenter();

  flex-direction: column;

  .signinDialogTitle {
    font-size: 2.25rem;
    font-weight: bold;
    color: color(dark);
    word-break: break-word;
    max-width: 540px;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .signinBtn {
    color: white;
    padding: 0.5rem 1.5rem;
    font-size: 1.5rem;
    background-color: color(dark, 800);
    border-radius: 0.25rem;
    cursor: pointer;
    margin-bottom: 1rem;

    @include flexCenter();

    &:hover {
      background-color: color(dark, 900);
    }
    &:active {
      background-color: color(dark, 900);
    }
  }

  .signinCancel {
    > span {
      font-size: 1.25rem;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
.signinDialogRight {
  flex: 1;
  background-color: color(dark, 700);
  color: color();
  font-size: 4rem;
  word-break: break-word;
  padding: 3rem;

  .signinDialogTitle {
    max-width: 540px;
  }
}
</style>
