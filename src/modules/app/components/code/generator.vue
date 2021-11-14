<template>
  <div>
    <CodeEditor v-model="form.generatedHtml" language="html" />
    <CodeEditor v-model="form.generatedCss" language="css" />
    <CodeEditor v-model="form.generatedJs" language="javascript" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CodeEditor from '@/core/components/CodeEditor.vue'
import { prettyCode } from '@core/utils/highlightCode';

export default defineComponent({
  name: 'CodeGenerator',
  components: {
    CodeEditor
  },
  setup(props) {
    const form = ref({
      generatedHtml: `<div>Hello world</div>`,
      generatedCss: `.hello { color: white; }`,
      generatedJs: `var a = b + c; a++;`,
    });

    const handleFormatCode = () => {
      form.value.generatedHtml = prettyCode(form.value.generatedHtml);
      form.value.generatedCss = prettyCode(form.value.generatedCss);
      form.value.generatedJs = prettyCode(form.value.generatedJs);
    };

    return {
      form,
      handleFormatCode,
    };
  },
})
</script>
