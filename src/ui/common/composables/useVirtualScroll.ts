import { ref, onMounted, onUnmounted } from "vue";
import { debounced, requestAnimationFrame } from "@/helpers";

export function useVirtualScroll(viewportRef: any, { count, itemHeight }: any) {
  const tolerance = 2;
  const toleranceHeight = tolerance * itemHeight;
  const beforeHeight = ref(0);
  const afterHeight = ref(0);
  const itemsCount = ref(0);
  const offset = ref(0);
  let el: HTMLElement;

  let lastScrollTop = 0;
  const onScroll: any = requestAnimationFrame(
    ({ target: { scrollTop } }: any) => {
      const dirrection = scrollTop > lastScrollTop ? "down" : "up";
      lastScrollTop = Math.max(scrollTop, 0); // For Mobile or negative scrolling

      offset.value = Math.floor((scrollTop - toleranceHeight) / itemHeight);
      beforeHeight.value = Math.max(offset.value * itemHeight, 0);
      const afterItemsCount = count - offset.value - itemsCount.value;
      afterHeight.value = Math.max(afterItemsCount * itemHeight, 0);
    }
  );

  const onResize = debounced(() => {
    itemsCount.value = Math.floor(el.clientHeight / itemHeight) + 2 * tolerance;
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

  return { beforeHeight, afterHeight };
}
