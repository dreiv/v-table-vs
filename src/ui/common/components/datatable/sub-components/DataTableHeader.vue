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
      {{ text }}
      <data-table-header-resize-handle :columnKey="key" />
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
}
</style>
