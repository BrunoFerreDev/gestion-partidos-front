<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn"
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            {{ title }}
          </h3>
          <button class="text-gray-500 hover:text-gray-700" @click="close">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 text-gray-700">
          <slot>
            {{ message }}
          </slot>
        </div>

        <!-- Footer -->
        <div
          class="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-200"
        >
          <button :class="cancelClassButton" @click="close">Cancelar</button>
          <button :class="confirmClassButton" @click="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, default: "Confirmar acción" },
  message: { type: String, default: "" },
  confirmText: { type: String, default: "Confirmar" },
  confirmClassButton: {
    type: String,
    default:
      "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition",
  },
  cancelClassButton: {
    type: String,
    default:
      "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition",
  },
});
const emit = defineEmits(["close", "confirm"]);

const close = () => emit("close");
const confirm = () => emit("confirm");
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
