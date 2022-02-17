<script setup lang="ts">
import { provide, ref, toRef, PropType } from "vue";

import { DataTableHeader, DataTableRows } from "./sub-components";
import { DataTableColumn, DataTableRow, DataTableKey } from ".";

const props = defineProps({
  columns: {
    type: Array as PropType<DataTableColumn[]>,
    default: () => [],
  },
  rows: {
    type: Array as PropType<DataTableRow[]>,
    default: () => [],
  },
});

function onResize() {
  console.log('resized');
}

provide(
  DataTableKey,
  ref({
    columns: toRef(props, "columns"),
    rows: toRef(props, "rows"),
    onResize
  })
);
</script>

<template>
  <table :class="$style.dataTable">
    <data-table-header />
    <data-table-rows />
  </table>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.dataTable {
  position: relative;
}
</style>
