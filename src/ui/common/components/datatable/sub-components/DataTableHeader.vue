<script setup lang="ts">
import { inject } from "vue";

import DataTableHeaderResizeHandle from "./DataTableHeaderResizeHandle.vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tr>
    <th v-for="{ key, text } in context?.columns" :key="key" :class="$style.header">
      {{ text }}
      <data-table-header-resize-handle />
    </th>
  </tr>
</template>

<style lang="scss" module>
.header {
  position: relative;
}
</style>
