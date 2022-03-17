<script setup lang="ts">
import { provide, ref, toRef } from "vue";

import { useVirtualScroll } from "@/ui/common";
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
  (e: "resize", key: string, diff: number): void;
  (e: "swap", from: string, to: string): void;
}>();

const tableWidth = ref(
  props.columns.reduce((acc, { config: { width } }) => acc + width, 0)
);

const viewport = ref();
const vScroll = useVirtualScroll(viewport, {
  count: props.rows.length,
  itemHeight: 20,
});

function onResize(key: string, diff: number) {
  tableWidth.value += diff;
  emit("resize", key, diff);
}

function onSwap(from: string, to: string) {
  emit("swap", from, to);
}

provide(
  DataTableKey,
  ref({
    columns: toRef(props, "columns"),
    rows: toRef(props, "rows"),
    vScroll,
    onResize,
    onSwap,
  })
);
</script>

<template>
  <div :class="$style.viewport" ref="viewport">
    <table :class="$style.dataTable" :width="tableWidth">
      <data-table-columns />
      <data-table-header />
      <data-table-rows />
    </table>
  </div>
</template>

<style lang="scss" module>
.dataTable {
  table-layout: fixed;
  border-collapse: collapse;
}

.viewport {
  overflow: auto;
}
</style>
