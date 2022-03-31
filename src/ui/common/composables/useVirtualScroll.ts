import { ref, computed, onMounted, onUnmounted } from "vue";
import { debounced, requestAnimationFrame } from "@/helpers";
import { Direction } from "@/ui/common";

export function useVirtualScroll(
  viewportRef: any,
  { total, itemHeight, getItems }: any
) {
  const tolerance = 2;
  const toleranceHeight = tolerance * itemHeight;
  const beforeHeight = ref(0);
  const count = ref();
  const offset = ref(0);
  let el: HTMLElement;

  let lastScrollTop = -1;
  const onScroll: any = requestAnimationFrame(
    ({ target: { scrollTop } }: any) => {
      if (scrollTop === lastScrollTop) return; // ignore horizontal scroll
      const direction: Direction = scrollTop > lastScrollTop ? "down" : "up";
      lastScrollTop = Math.max(scrollTop, 0); // For Mobile or negative scrolling

      offset.value = Math.floor((scrollTop - toleranceHeight) / itemHeight);
      beforeHeight.value = Math.max(offset.value * itemHeight, 0);
      getItems(offset.value, count.value, direction);
    }
  );

  const onResize = debounced(() => {
    const prevcount = count.value;
    count.value = Math.floor(el.clientHeight / itemHeight) + 2 * tolerance;

    if (prevcount !== count.value) getItems(offset.value, count.value, "down");
  });

  let resizeObserver = new ResizeObserver(onResize);
  let controller = new AbortController();
  onMounted(() => {
    if (!viewportRef.value) return;
    el = viewportRef.value;

    resizeObserver.observe(el);
    el.addEventListener("scroll", onScroll, {
      passive: true,
      signal: controller.signal,
    });
  });

  onUnmounted(() => {
    resizeObserver.disconnect();
    controller.abort();
  });

  const afterHeight = computed(() => {
    const aftercount = total.value - offset.value - count.value;

    return Math.max(aftercount * itemHeight, 0);
  });

  return { beforeHeight, afterHeight };
}
