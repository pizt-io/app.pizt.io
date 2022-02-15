import { computed, onBeforeMount, ref } from "vue";

export const useDark = () => {
  const _isDark = ref(localStorage && localStorage.getItem("isDark"));

  const isDark = computed({
    get: () => +(_isDark.value || 0),
    set: (value) => {
      _isDark.value = (value || 0).toString();
      localStorage.setItem("isDark", _isDark.value);
    },
  });

  const toggleDark = () => {
    isDark.value = isDark.value ? 0 : 1;
    document.body.classList.toggle("dark", !!isDark.value);
  };

  onBeforeMount(() => {
    document.body.classList.toggle("dark", !!isDark.value);
  });

  return {
    isDark,
    toggleDark,
  };
};
