<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const { columns } = inject(DataTableKey, {});
</script>

<template>
  <tr>
    <th v-for="column in columns">{{ column.text }}</th>
  </tr>
</template>
