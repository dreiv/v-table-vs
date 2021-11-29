<script setup lang="ts">
import { provide, PropType } from "vue";

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

provide(DataTableKey, props);
</script>

<template>
  <table>
    <data-table-header />
    <data-table-rows />
  </table>
</template>
