<script setup lang="ts">
import StudentsComponent from './components/StudentsComponent.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
</script>

<template>
  <component :is="DefaultLayout">
    <StudentsComponent />
  </component>
</template>
