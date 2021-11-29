<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <tr v-for="row in context?.rows">
    <td v-for="{ key } in context?.columns">{{ row[key] }}</td>
  </tr>
</template>
