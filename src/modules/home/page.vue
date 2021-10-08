<template>
  <div :class="$style.layoutWrapper">

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: {},
});
</script>

<style lang="scss" module>
@import "@styles/scss/all";

.layoutWrapper {
  min-height: 100vh;
}
</style>
