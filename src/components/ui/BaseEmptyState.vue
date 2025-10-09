<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="flex flex-col items-center justify-center py-10 text-center text-gray-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-14 h-14 mb-3 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <h3 class="text-lg font-medium">{{ title }}</h3>
      <p class="mt-2 text-sm text-gray-400">
        <slot>
          {{ message }}
        </slot>
      </p>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Sin resultados",
  },
  message: {
    type: String,
    default: "No se encontraron registros para mostrar.",
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 3000, // 3 segundos
  },
});

const emit = defineEmits(["close"]);

const visible = ref(true);
let timer = null;

onMounted(() => {
  if (props.autoClose) {
    timer = setTimeout(() => {
      visible.value = false;
      emit("close");
    }, props.duration);
  }
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
