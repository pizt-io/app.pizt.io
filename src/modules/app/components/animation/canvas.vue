<template>
  <div class="w-full h-full flex justify-center items-center">
    <div :style="{ width: '800px', height: '600px' }" class="bg-white dark:bg-gray-800">
      <SVGCanvas ref="canvasRef" :key="forceUpdateCanvasFlag" :data="data" />
    </div>
  </div>
</template>

<script lang="ts">
// PERFORMANCE NOTICE:
// DEVTOOL CAN SOMETIME NOT DETECT CHANGES IN THE COMPONENT DUE TO HUGE AND DEEPLY NESTED DATA CHANGES

import { ComponentPublicInstance, defineComponent, getCurrentInstance, ref, watch } from 'vue';
import { useStore } from 'vuex';

import SVGCanvas from '@/modules/app/components/animation/svg/SVGCanvas.vue';

import _debounce from 'lodash/debounce';
import _isEqual from 'lodash/isEqual';

export default defineComponent({
  name: 'AnimationCanvas',
  components: {
    SVGCanvas
  },
  setup(props) {
    const canvasRef = ref<ComponentPublicInstance | null>(null);

    const store = useStore();
    const vm = getCurrentInstance()?.proxy;

    const forceUpdateCanvasFlag = ref(0);

    const data = ref<any[]>([]);

    const hasUnsyncedDataFromOtherAccess = ref(false);

    const _forceRerenderCanvas = () => {
      forceUpdateCanvasFlag.value++;
    }

    const _updateCanvasDataFromStore = () => {
      data.value = store.state.app.elements;

      // data change
      // update to database
      // api returns data from database to make sure that data is synced
      // if those data are not equal, they're unsynced, notify user
      hasUnsyncedDataFromOtherAccess.value = !_isEqual(data.value, store.state.app.elements);
    }

    // Fetch data from backend
    const _getCanvasDataOnce = async () => {
      await store.dispatch('app/getCanvasElements');

      _updateCanvasDataFromStore();
      _forceRerenderCanvas();
    };
    _getCanvasDataOnce();

    const _updateCanvasDataToDatabase = async () => {
      await store.dispatch('app/updateCanvasElements', data.value);

      _updateCanvasDataFromStore();
    }

    const fileSize = ref('');
    const _calculateFileSize = () => {
      fileSize.value = `${((canvasRef.value?.$el?.innerHTML.length || 0) / 1024).toFixed(2)} Kb`;
    };

    watch(
      () => data.value,
      _debounce(function() {
        _updateCanvasDataToDatabase();
        _calculateFileSize();
        console.log('File size:', fileSize.value);

      }, 1500),
      { deep: true }
    );

    return {
      data,
      canvasRef,
      fileSize,
      forceUpdateCanvasFlag,
      hasUnsyncedDataFromOtherAccess,
    }
  }
})
</script>
