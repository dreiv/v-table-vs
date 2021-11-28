<script setup lang="ts">
import { DefaultLayout } from '@/layouts'
import { Dashboard } from '@/views'
</script>

<template>
  <component :is="DefaultLayout">
    <Dashboard />
  </component>
</template>
