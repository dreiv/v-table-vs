<script setup lang="ts">
import { DataTable } from '@/ui/common';
import { useDataTableStore } from '@/store';

const store = useDataTableStore();

</script>

<template>
  <header>
    <h1>Table</h1>
  </header>
  <main :class="$style.main">
    <data-table
      :columns="store.columns"
    />
  </main>
  <footer>Footer</footer>
</template>

<style lang="scss" module>
.main {
  flex: 1;
}
</style>
