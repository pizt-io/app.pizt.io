<template>
  <div :class="$style.layoutWrapper">

  </div>
</template>

<style lang="scss" module>
@import "@styles/scss/all";

.layoutWrapper {
  background-color: color(gray, 900);

  @include size(100vw, 100vh);
}
</style>
