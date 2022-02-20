<script setup lang="ts">
import { ref, inject } from "vue";
import { requestAnimationFrame } from "@/helpers";
import { DataTableKey } from "../symbols";

const context = inject(DataTableKey);
const props = defineProps<{ columnKey: string; width: number }>();

const handle = ref<HTMLDivElement>();
const isActive = ref(false);
let diff = 0;

const moveHandle = requestAnimationFrame(
  ({ clientX }: MouseEvent, offset: number) => {
    const { width } = props;
    const min = 40 - width;
    const max = 400 - width;
    const handleOffset = clientX - offset - 8;
    diff = Math.min(Math.max(handleOffset, min), max); // clamp resize

    handle.value!.style.transform = `translateX(${diff}px)`;
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
    ({ buttons }) => {
      if (buttons & 1) return; // on left click release

      context?.value.onResize(props.columnKey, diff);

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
    :class="[{ [$style.active]: isActive }, $style.handle]"
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
