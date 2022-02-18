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

const emit = defineEmits<{
  (e: "resize", columnKey: string, updatedWidth: number): void;
}>();

const initialWidth = props.columns.reduce(
  (acc, { config: { width } }) => acc + width,
  0
);
const tableWidth = ref(initialWidth);

function onResize(columnKey: string, updatedWidth: number) {
  tableWidth.value += updatedWidth;
  emit("resize", columnKey, updatedWidth);
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
  <table :class="$style.dataTable" :width="tableWidth">
    <data-table-columns />
    <data-table-header />
    <data-table-rows />
  </table>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.dataTable {
  table-layout: fixed;
}
</style>
