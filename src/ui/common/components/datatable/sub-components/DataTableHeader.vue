<script setup lang="ts">
import { inject } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tr :class="$style.sticky">
    <th
      v-for="{ key, text, width } in context?.columns"
      :key="key"
      :class="$style.header"
      :width="width"
    >
      {{ text }}
      <data-table-header-resize-handle />
    </th>
  </tr>
</template>

<style lang="scss" module>
.header {
  position: relative;
}

.sticky {
  position: sticky;
  top: 0;
  background-color: var(--surface);
}
</style>
