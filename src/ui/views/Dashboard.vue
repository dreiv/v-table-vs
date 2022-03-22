<script setup lang="ts">
import { DataTable } from "@/ui/common";
import { useDataTableStore } from "@/store";

const store = useDataTableStore();
store.persistOnUnload();
</script>

<template>
  <header>
    <h1>Table</h1>
  </header>
  <main :class="$style.main">
    <data-table
      :class="$style.cover"
      :columns="store.columns"
      :rows="store.shownRows"
      :total="store.total"
      @fetch-rows="store.fetchRows"
      @resize="store.resizeColumn"
      @swap="store.swapColumns"
    />
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

.cover {
  @include absolute(0, 0);
}
</style>
