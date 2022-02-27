<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tbody>
    <tr v-for="row in context?.rows" :key="row.id">
      <td v-for="{ key } in context?.columns" :key="key" :class="$style.td">
        {{ row[key] }}
      </td>
    </tr>
  </tbody>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";
.td {
  @include trim;
}
</style>
