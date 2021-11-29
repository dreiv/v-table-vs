<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const { columns, rows } = inject(DataTableKey, {});
</script>

<template>
  <tr v-for="row in rows">
    <td v-for="{ key } in columns">{{ row[key] }}</td>
  </tr>
</template>
