export function requestAnimationFrame(fn: Function): Function {
  let timeout: number;

  return (...args: any) => {
    timeout && window.cancelAnimationFrame(timeout);
    timeout = window.requestAnimationFrame(() => fn(...args));
  };
}
