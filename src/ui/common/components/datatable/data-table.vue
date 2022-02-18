<script setup lang="ts">
import { provide, ref, toRef } from "vue";

import {
  DataTableColumns,
  DataTableHeader,
  DataTableRows,
} from "./sub-components";
import { DataTableColumn, DataTableRow, DataTableKey } from ".";

const props = defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
}>();

const startWidth = props.columns.reduce(
  (acc, { config: { width } }) => acc + width,
  0
);
const tableWidth = ref(startWidth);

const emit = defineEmits<{
  (e: "resize", columnKey: string, updatedWidth: number): void;
}>();

function onResize(columnKey: string, updatedWidth: number) {
  emit("resize", columnKey, updatedWidth);
  tableWidth.value += updatedWidth;
}

provide(
  DataTableKey,
  ref({
    columns: toRef(props, "columns"),
    rows: toRef(props, "rows"),
    onResize,
  })
);
</script>

<template>
  <table :class="$style.dataTable" :style="{ width: `${tableWidth}px` }">
    <data-table-columns />
    <data-table-header />
    <data-table-rows />
  </table>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.dataTable {
  table-layout: fixed;
  position: relative;
}
</style>
