<script setup lang="ts">
import { inject, ref } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
const COLUMN_KEY = "column-key";
const draggedColumn = ref();
const targetColumn = ref();

function startDrag(evt: DragEvent, from: string) {
  evt.dataTransfer?.setData(COLUMN_KEY, draggedColumn.value = from);
}

function onDrop(evt: DragEvent, to: string) {
  const from = evt.dataTransfer?.getData(COLUMN_KEY) as string;
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
      @dragover.prevent="targetColumn = key"
      @dragleave="targetColumn = null"
    >
      <div
        :class="[
          { [$style.isDragged]: key === draggedColumn },
          { [$style.isDropTarget]: key === targetColumn },
          $style.container,
        ]"
      >
        <div
          :class="$style.title"
          draggable="true"
          @dragstart="startDrag($event, key)"
          @dragend="draggedColumn = targetColumn = null"
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
@import "@/ui/assets/styles/abstracts";

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

$viewportHeight: 100vh;
.isDropTarget::before {
  @include box(4px, $viewportHeight);
  position: absolute;
  content: "";

  box-shadow: 0 $viewportHeight 0 var(--primary);
  margin-top: -$viewportHeight;
  opacity: 0.5;
}

.isDragged {
  background-color: #dceefa;
}
</style>
