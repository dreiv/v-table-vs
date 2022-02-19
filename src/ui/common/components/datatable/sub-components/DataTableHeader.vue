<script setup lang="ts">
import { inject } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
const COLUMN_KEY = "column-key";

function startDrag(evt: DragEvent, from: string) {
  evt.dataTransfer?.setData(COLUMN_KEY, from);
}

function onDrop(evt: DragEvent, to: string) {
  const from = evt.dataTransfer?.getData(COLUMN_KEY) || "";
  context?.value.onSwap(from, to);
}
</script>

<template>
  <tr :class="$style.sticky">
    <th
      v-for="{ key, text } in context?.columns"
      :key="key"
      :class="$style.header"
      @drop="onDrop($event, key)"
      @dragover.prevent
    >
      <div :class="$style.container">
        <div
          :class="$style.title"
          draggable="true"
          @dragstart="startDrag($event, key)"
        >
          {{ text }}
        </div>
        <div>↕</div>
        <data-table-header-resize-handle :columnKey="key" />
      </div>
    </th>
  </tr>
</template>

<style lang="scss" module>
.sticky {
  position: sticky;
  top: 0;

  background-color: var(--surface);
}

.header {
  position: relative;

  margin-right: -8px;
}
.container {
  display: flex;
  gap: 8px;
}

.title {
  flex: 1;
  cursor: grab;
}
</style>
