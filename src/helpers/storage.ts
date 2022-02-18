export function getItem<T>(key: string): T | void {
  const item = localStorage.getItem(key);

  if (item) {
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error("Error on retrieving data from localStorage", e);
    }
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error when saving to localStorage", error);
  }
}
