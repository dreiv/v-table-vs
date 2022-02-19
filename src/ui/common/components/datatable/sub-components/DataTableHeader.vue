<script setup lang="ts">
import { inject } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tr :class="$style.sticky">
    <th
      v-for="{ key, text } in context?.columns"
      :key="key"
      :class="$style.header"
    >
      <div :class="$style.container">
        <div :class="$style.text">{{ text }}</div>
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

.text {
  flex: 1;
}
</style>
