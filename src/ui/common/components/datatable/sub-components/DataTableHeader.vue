<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tr>
    <th v-for="column in context?.columns">{{ column.text }}</th>
  </tr>
</template>
