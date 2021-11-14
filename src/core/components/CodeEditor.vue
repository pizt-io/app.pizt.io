<template>
  <prism-editor
    class="my-editor"
    v-model="code"
    line-numbers
    :highlight="highlighter"
    @input="handleInputEditor"
  />
</template>

<script lang="ts">
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

import { format, Options } from 'prettier';

// import highlighting library (you can use any library you want just return html string)
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

import { defineComponent, ref } from 'vue';

export default defineComponent({
  model: {
    value: 'modelValue',
    event: 'input:modelValue',
  },
  components: {
    PrismEditor,
  },
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
  },
  setup(props, { emit }) {
    const code = ref('');

    const highlighter = (code: string) => {
      return Prism.highlight(code, Prism.languages[props.language], props.language);
    }

    const handleInputEditor = (code: string) => {
      emit('input:modelValue', code);
    }

    return {
      code,
      highlighter,
      handleInputEditor,
    }
  },
});
</script>

<style lang="scss">
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
