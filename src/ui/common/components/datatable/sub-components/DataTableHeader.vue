<script setup lang="ts">
import { inject } from "vue";

import { requestAnimationFrame } from '@/helpers';
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);

const debounced = requestAnimationFrame(({ clientY }: MouseEvent) => {
  console.log('Y', clientY);
});

function onResize({ buttons }: MouseEvent) {
  if (buttons !== 1) return;
  const controller = new AbortController();
  const { signal } = controller;

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
  <tr>
    <th v-for="{ key, text } in context?.columns" :key="key" :class="$style.header">
      {{ text }}
      <div :class="$style.handle" @mousedown="onResize" />
    </th>
  </tr>
</template>

<style lang="scss" module>
.header {
  position: relative;
}

.handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;

  width: 4px;
  background-color: red;

  cursor: col-resize;
  user-select: none;
}
</style>
