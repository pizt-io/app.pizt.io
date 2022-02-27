<template>
  <div class="h-full pr-2 flex">
    <div
      :class="$style.defaultTransitionWrapperTrigger"
      @click="defaultTransitionVisible = !defaultTransitionVisible"
    >
      <i :class="defaultTransitionVisible ? 'icon-arrow-left' : 'icon-arrow-right'"></i>
    </div>
    <div
      class="flex overflow-hidden duration-300"
      :style="{
        width: defaultTransitionVisible ? `calc(5rem * ${defaultTransitions.length})` : '0px',
      }"
    >
      <div
        v-for="transition in defaultTransitions"
        :key="transition.animationName"
        :class="$style.transitionItemWrapper"
        @click="handleSelectTransition(transition)"
      >
        <div
          :class="[
            $style.transitionItem,
            transition.userId
              ? transition?._id === selectedTransition?._id && 'border-4 border-secondary-600'
              : transition?.animationName === selectedTransition?.animationName &&
                'border-4 border-secondary-600',
          ]"
        >
          <img :src="transition.thumbnail" />
        </div>
        <div :class="$style.transitionItemLabel">
          {{ transition.label }}
        </div>
      </div>
    </div>
    <div class="h-full bg-primary-800 select-none" style="width: 1px" />
    <div
      v-for="transition in userTransitions"
      :key="transition.animationName"
      :class="$style.transitionItemWrapper"
      @click="handleSelectTransition(transition)"
    >
      <div
        :class="[
          $style.transitionItem,
          transition.userId
            ? transition?._id === selectedTransition?._id && 'border-4 border-secondary-600'
            : transition?.animationName === selectedTransition?.animationName &&
              'border-4 border-secondary-600',
        ]"
      >
        <img :src="transition.thumbnail" />
      </div>
      <div :class="$style.transitionItemLabel">
        {{ transition.label }}
      </div>
    </div>
    <div class="text-center mx-2 mt-2" @click="handleAddTransition">
      <div :class="$style.transitionItem"><span class="transform scale-250">+</span></div>
      <div class="text-sm text-white"> Add new </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from "@store/state";
import { ElMessage } from "element-plus";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransitionToolbar",
  setup(props, { emit }) {
    const store = useStore<RootState>();
    const userSession = computed(() => store.state.userSession);

    const selectedTransition = computed(() => {
      return store.state.selectedTransition as any;
    });

    const transitions = computed(() => {
      return store.state.transitions.filter((t) => t) as any[];
    });

    const defaultTransitions = computed(() => {
      return transitions.value.filter((t) => !t.userId) as any[];
    });
    const userTransitions = computed(() => {
      return transitions.value.filter((t) => t.userId) as any[];
    });

    const handleSelectTransition = (transition: any) => {
      if (transition._id !== selectedTransition.value._id) {
        store.dispatch("updateSelectedTransition", transition);

        emit("select", transition);
      }
    };

    const handleAddTransition = () => {
      if (userSession.value?.user) {
        store.dispatch("createTransition");
      } else {
        ElMessage.warning("You need to login to create a new transition");
      }
    };

    const defaultTransitionVisible = ref(true);
    onMounted(() => {
      setTimeout(() => {
        defaultTransitionVisible.value = userTransitions.value.length === 0;
      }, 1000);
    });

    return {
      defaultTransitionVisible,
      selectedTransition,
      defaultTransitions,
      userTransitions,
      handleSelectTransition,
      handleAddTransition,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.defaultTransitionWrapperTrigger {
  background-color: color();
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  border-left: 1px solid color(primary, 700);

  @include size(1.5rem, 100%);
  @include flexCenter();
}

.transitionItemWrapper {
  width: 4rem;
  text-align: center;
  margin: 0.5rem 0.5rem 0;

  @include flexBox($direction: column, $align: center);
}

.transitionItem {
  border-radius: 9999px;
  background-color: color();
  cursor: pointer;
  transition-duration: $duration-base;

  @include size(4rem);
  @include flexCenter();

  &:hover {
    background-color: color(secondary);
  }

  &:active {
    background-color: color(secondary, 600);
  }
}
.transitionItemLabel {
  flex: 1;
  color: white;
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;

  @include flexCenter();
}
</style>
