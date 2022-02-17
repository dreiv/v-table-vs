<script setup lang="ts">
import { ref, inject } from "vue";
import { requestAnimationFrame } from "@/helpers";
import { DataTableKey } from "../symbols";

const handle = ref<HTMLDivElement>();
const context = inject(DataTableKey);

const props = defineProps<{ columnKey: string }>();

const moveHandle = requestAnimationFrame(
  ({ clientX }: MouseEvent, offset: number) => {
    console.log("clientX", clientX);
    console.log("diff", clientX - offset);
    console.log(
      "handleOffset",
      Math.round(handle.value?.getBoundingClientRect().x || 0)
    );

    handle.value && (handle.value.style.right = `${offset - clientX}px`);
  }
);

function onResize({ buttons }: MouseEvent) {
  if (buttons !== 1) return;
  const controller = new AbortController();
  const { signal } = controller;
  const offset = Math.round(handle.value?.getBoundingClientRect().x || 0);
  console.log("offset", offset);

  document.addEventListener(
    "mousemove",
    (e) => {
      if (e.buttons !== 1) return;

      moveHandle(e, offset);
    },
    { signal }
  );

  document.addEventListener(
    "mouseup",
    (e) => {
      if (e.buttons & 1) return;

      const updatedWidth = e.clientX - offset;
      context?.value.onResize(props.columnKey, updatedWidth);
      controller.abort();
    },
    { signal }
  );
}
</script>

<template>
  <div ref="handle" :class="$style.handle" @mousedown="onResize" />
</template>

<style lang="scss" module>
@import "@/ui/assets/styles/abstracts";

$viewportHeight: 100vh;
.handle {
  @include absolute(0, -2px, 0, null);

  width: 5px;
  background-color: red;

  cursor: col-resize;
  user-select: none;

  &::after {
    @include box(1px, $viewportHeight);
    @include margin-horiz(auto);
    content: "";

    display: block;
    box-shadow: 0 $viewportHeight 0 #000;
    margin-top: -$viewportHeight;
  }
}
</style>
