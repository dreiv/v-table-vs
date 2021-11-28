<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/abstracts";

.layout {
  @include flex-column();
  @include box(100%);

  max-width: 60rem;
  margin: 0 auto;
  padding: var(--space-md) var(--space-xs);
}
</style>
