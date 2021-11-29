<script setup lang="ts">
import { Datatable } from '@/common'
</script>

<template>
  <header>
    <h1>Table</h1>
  </header>
  <main :class="$style.main">
    <Datatable />
  </main>
  <footer>Footer</footer>
</template>

<style lang="scss" module>
.main {
  flex: 1;
}
</style>
