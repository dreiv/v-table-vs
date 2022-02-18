<script setup lang="ts">
import { inject } from "vue";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
</script>

<template>
  <colgroup>
    <col v-for="{ key, width } in context?.columns" :key="key" :width="width" />
  </colgroup>
</template>
