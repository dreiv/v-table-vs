<script setup lang="ts">
import { inject, computed } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
const rows = computed(() => {
  const { rows, groupBy } = context?.value!;

  return !groupBy
    ? rows
    : rows.map((row, idx) => {
        // TODO: find why this gets called so often
        if (!row.loading && (!idx || rows[idx - 1][groupBy] !== row[groupBy])) {
          row.isHeader = true;
        }

        return row;
      });
});
</script>

<template>
  <tbody>
    <tr :height="context?.vScroll.beforeHeight"></tr>
    <template v-for="row in rows" :key="row.id">
      <tr v-if="row.isHeader" :class="$style.header">
        <td>{{row[context?.groupBy!]}}</td>
      </tr>
      <tr>
        <td v-if="row.loading">loading...</td>
        <td
          v-else
          v-for="{ key } in context?.columns"
          :key="key"
          :class="$style.td"
        >
          {{ row[key] }}
        </td>
      </tr>
    </template>
    <tr :height="context?.vScroll.afterHeight"></tr>
  </tbody>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
.td {
  @include trim;
}

.header {
  background-color: beige;
}
</style>
