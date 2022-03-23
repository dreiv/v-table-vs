import { ref, computed, onMounted, onUnmounted } from "vue";
import { debounced, requestAnimationFrame } from "@/helpers";
import { Direction } from "@/ui/common";

export function useVirtualScroll(
  viewportRef: any,
  { count, itemHeight, getItems }: any
) {
  const tolerance = 2;
  const toleranceHeight = tolerance * itemHeight;
  const beforeHeight = ref(0);
  const itemsCount = ref();
  const offset = ref(0);
  let el: HTMLElement;

  let lastScrollTop = -1;
  const onScroll: any = requestAnimationFrame(
    ({ target: { scrollTop } }: any) => {
      if (scrollTop === lastScrollTop) return;
      const direction: Direction = scrollTop > lastScrollTop ? "down" : "up";
      lastScrollTop = Math.max(scrollTop, 0); // For Mobile or negative scrolling

      offset.value = Math.floor((scrollTop - toleranceHeight) / itemHeight);
      beforeHeight.value = Math.max(offset.value * itemHeight, 0);
      getItems(offset.value, itemsCount.value, direction);
    }
  );

  const onResize = debounced(() => {
    const prevItemsCount = itemsCount.value;
    itemsCount.value = Math.floor(el.clientHeight / itemHeight) + 2 * tolerance;

    if (prevItemsCount !== itemsCount.value)
      getItems(offset.value, itemsCount.value, "down");
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
    const afterItemsCount = count.value - offset.value - itemsCount.value;

    return Math.max(afterItemsCount * itemHeight, 0);
  });

  return { beforeHeight, afterHeight };
}
