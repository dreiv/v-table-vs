<script setup lang="ts">
import { ref } from "vue";
import { requestAnimationFrame } from '@/helpers';

const handle = ref<HTMLDivElement | null>(null);

const debounced = requestAnimationFrame(({ clientX }: MouseEvent, offset: number) => {
  console.log('clientX', clientX);
  console.log('diff', offset - clientX);
  console.log('handleOffset',  Math.round(handle.value?.getBoundingClientRect().x || 0))

  handle.value && (handle.value.style.right = `${offset - clientX}px`);
});

function onResize({ buttons }: MouseEvent) {
  if (buttons !== 1) return;
  const controller = new AbortController();
  const { signal } = controller;
  const offset = Math.round(handle.value?.getBoundingClientRect().x || 0);
  console.log('offset', offset);

  document.addEventListener('mousemove', e => {
    if (e.buttons !== 1) return;

    debounced(e, offset);
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
    background-color: lime;
  }
}
</style>
