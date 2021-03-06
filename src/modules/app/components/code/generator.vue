<template>
  <div class="h-full overflow-y-auto">
    <h3 class="px-5 pt-5 text-white">Generated code</h3>
    <div class="m-5">
      <div class="flex items-center justify-between mb-3">
        <span class="text-white">HTML</span>
        <el-button
          size="mini"
          class="bg-primary hover:bg-primary-600 border-none h-6 min-h-6 px-3 py-1"
          @click="handleCopyToClipboard(form.generatedHtml)"
        >
          <i class="icon-file_copy text-dark-900" />
          <span class="text-dark-900 ml-1">Copy</span>
        </el-button>
      </div>
      <CodeEditor
        v-model="form.generatedHtml"
        language="html"
        class="bg-gray-800 rounded-lg"
        readonly
      />
    </div>
    <div class="m-5">
      <div class="flex items-center justify-between mb-3">
        <span class="text-white">CSS</span>
        <el-button
          size="mini"
          class="bg-primary hover:bg-primary-600 border-none h-6 min-h-6 px-3 py-1"
          @click="handleCopyToClipboard(generatedCss)"
        >
          <i class="icon-file_copy text-dark-900" />
          <span class="text-dark-900 ml-1">Copy</span>
        </el-button>
      </div>
      <CodeEditor v-model="generatedCss" language="css" class="bg-gray-800 rounded-lg" readonly />
    </div>
    <div class="m-5">
      <div class="flex items-center justify-between mb-3">
        <span class="text-white">JS</span>
        <el-button
          size="mini"
          class="bg-primary hover:bg-primary-600 border-none h-6 min-h-6 px-3 py-1"
          @click="handleCopyToClipboard(form.generatedJs)"
        >
          <i class="icon-file_copy text-dark-900" />
          <span class="text-dark-900 ml-1">Copy</span>
        </el-button>
      </div>
      <CodeEditor
        v-model="form.generatedJs"
        language="javascript"
        class="bg-gray-800 rounded-lg"
        readonly
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
import { prettyCodeCss } from "@core/utils/prettier";
import { useStore } from "vuex";
import { RootState } from "@store/state";
import { keyframes } from "@core/utils/keyframes";
import { copyToClipboard } from "@core/utils/copy";
import { ElMessage } from "element-plus";

import "element-plus/theme-chalk/el-message.css";

export default defineComponent({
  name: "CodeGenerator",
  components: {
    CodeEditor: defineAsyncComponent(() => import("@/core/components/code-editor")),
  },
  setup() {
    const store = useStore<RootState>();

    const form = ref({
      generatedHtml: `<div class="piztAnimation" />`,
      generatedJs: ``,
    });

    const selectedTransition = computed(() => store.state.selectedTransition);

    const generatedCss = computed({
      get: () => {
        const parsedKeyframes =
          selectedTransition.value.animationKeyframes &&
          keyframes.stringify({
            [selectedTransition.value.animationName]: selectedTransition.value.animationKeyframes,
          });

        console.log(parsedKeyframes, selectedTransition.value.animationKeyframes);

        const result = `
          ${parsedKeyframes}

          .piztAnimation {
            animation-name: ${selectedTransition.value.animationName};
            animation-duration: ${selectedTransition.value.animationDuration};
            animation-delay: ${selectedTransition.value.animationDelay};
            animation-iteration-count: ${
              selectedTransition.value.animationIsInfinite
                ? "infinite"
                : selectedTransition.value.animationIterationCount
            };
            animation-timing-function: ${selectedTransition.value.animationTimingFunction};
            animation-fill-mode: ${selectedTransition.value.animationFillMode};
            animation-direction: ${selectedTransition.value.animationDirection};

            ${Object.keys(selectedTransition.value?.animationStyles || {})
              .map(
                (property) => `${property}: ${selectedTransition.value.animationStyles[property]};`,
              )
              .join("")}

            background-color: #FFDB15;
            width: 120px;
            height: 120px;
          }
        `;

        return prettyCodeCss(result);
      },
      set: () => {},
    });

    const handleCopyToClipboard = (text: string) => {
      copyToClipboard(text);
      ElMessage.success("Copied to clipboard");
    };

    return {
      form,
      generatedCss,
      handleCopyToClipboard,
    };
  },
});
</script>
