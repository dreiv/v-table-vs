<script setup lang="ts">
import { ref } from "vue";
import { requestAnimationFrame } from '@/helpers';

let offset = 0;
const handle = ref<HTMLDivElement | null>(null);

const debounced = requestAnimationFrame(({ clientX }: MouseEvent) => {
  handle.value && (handle.value.style.right = `${offset - clientX}px`);
});

function onResize({ buttons, clientX }: MouseEvent) {
  if (buttons !== 1) return;
  const controller = new AbortController();
  const { signal } = controller;
  offset = handle.value?.getBoundingClientRect().x || 0;

  document.addEventListener('mousemove', e => {
    if (e.buttons !== 1) return;

    debounced(e);
  }, { signal });

  document.addEventListener('mouseup', e => {
    if (e.buttons & 1) return;

    controller.abort();
  }, { signal });
};
</script>

<template>
  <div ref="handle" :class="$style.handle" @mousedown="onResize" />
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.handle {
  @include absolute(0, 0, 0, null);

  width: 4px;
  background-color: red;

  cursor: col-resize;
  user-select: none;

  &::after {
    content: '';
    padding-bottom: 100px;
    margin-bottom: -100px;
    background-color: lime;
  }
}
</style>
