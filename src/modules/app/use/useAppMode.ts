import { APP_MODE } from '@core/constants/navigator';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

export const useAppMode = () => {
  const router = useRouter();
  const route = useRoute();

  const appMode = computed(() => route.query.mode || APP_MODE.MAIN)

  const changeAppMode = (mode: APP_MODE) => {
    router.push({
      query: {
        mode,
      }
    })
  }
  if (!route.query.mode) changeAppMode(APP_MODE.MAIN)

  return {
    appMode,
    changeAppMode,
  }
}
