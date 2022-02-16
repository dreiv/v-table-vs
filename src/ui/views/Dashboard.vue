<script setup lang="ts">
import { DataTable } from "@/ui/common";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
store.fetchRows();
</script>

<template>
  <header>
    <h1>Table</h1>
  </header>
  <main :class="$style.main">
    <div :class="$style.wrapper">
      <data-table :columns="store.columns" :rows="store.rows" />
    </div>
  </main>
  <footer>Footer</footer>
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

.main {
  flex: 1;
  position: relative;
  background-color: var(--surface);
}

.wrapper {
  @include absolute(0, 0);
  overflow: auto;
}
</style>
