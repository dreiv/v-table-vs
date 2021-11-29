<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tr v-for="row in context?.rows" :key="row.id">
    <td v-for="{ key } in context?.columns" :key="key">{{ row[key] }}</td>
  </tr>
</template>
