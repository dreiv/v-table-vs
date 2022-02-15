<script setup lang="ts">
import { provide, ref, PropType } from "vue";

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

provide(DataTableKey, ref(props));
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

  &:after {
    content: "";
    @include absolute(0, 0, 0, null);

    width: 1px;
    background-color: lime;
  }
}
</style>
