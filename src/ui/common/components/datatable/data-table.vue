<script setup lang="ts">
import { provide, ref, toRef } from "vue";

import { useVirtualScroll, Direction } from "@/ui/common";
import {
  DataTableColumns,
  DataTableHeader,
  DataTableRows,
} from "./sub-components";
import { DataTableColumn, DataTableRow, DataTableKey } from ".";

const props = defineProps<{
  columns: DataTableColumn[];
  rows: DataTableRow[];
  total: number;
}>();

const emit = defineEmits<{
  (e: "resize", key: string, diff: number): void;
  (e: "swap", from: string, to: string): void;
  (e: "fetchRows", offset: number, count: number, direction: Direction): void;
}>();

const tableWidth = ref(
  props.columns.reduce((acc, { config: { width } }) => acc + width, 0)
);

const viewport = ref();
const vScroll = useVirtualScroll(viewport, {
  total: toRef(props, "total"),
  itemHeight: 26,
  getItems: fetchRows,
});

function fetchRows(offset: number, count: number, direction: Direction) {
  emit("fetchRows", offset, count, direction);
}

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
