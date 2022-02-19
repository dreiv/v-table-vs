<script setup lang="ts">
import { ref, inject } from "vue";
import { requestAnimationFrame } from "@/helpers";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
const props = defineProps<{ columnKey: string }>();

const handle = ref<HTMLDivElement>();
const isActive = ref(false);

const moveHandle = requestAnimationFrame(
  ({ clientX }: MouseEvent, offset: number) => {
    handle.value!.style.transform = `translateX(${clientX - offset - 8}px)`;
  }
);

function startResize({ buttons }: MouseEvent) {
  if (buttons !== 1) return; // only consider left click
  const controller = new AbortController();
  const offset = Math.round(handle.value?.getBoundingClientRect().x || 0);
  isActive.value = true;

  document.addEventListener(
    "mousemove",
    (e) => {
      if (e.buttons !== 1) return; // only consider left click

      moveHandle(e, offset);
    },
    { signal: controller.signal }
  );

  document.addEventListener(
    "mouseup",
    ({ buttons, clientX }) => {
      if (buttons & 1) return; // on left click release

      context?.value.onResize(props.columnKey, clientX - offset);

      // cleanup
      handle.value!.style.removeProperty("transform");
      isActive.value = false;
      controller.abort();
    },
    { signal: controller.signal }
  );
}
</script>

<template>
  <div
    ref="handle"
    :class="[{[$style.active]: isActive}, $style.handle]"
    @mousedown="startResize"
  />
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

$viewportHeight: 100vh;
.handle {
  width: 16px;
  background-color: var(--primary);

  cursor: w-resize;
  user-select: none;

  &::after {
    @include box(1px, $viewportHeight);
    @include margin-horiz(auto);
    content: "";

    box-shadow: 0 $viewportHeight 0 var(--primary);
    margin-top: -$viewportHeight;
  }

  &.active,
  &:hover {
    &::after {
      display: block;
    }
  }
}
</style>
