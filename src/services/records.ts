import { Direction } from "@/ui/common";

const apiUrl = new URL("http://127.0.0.1:4040");
const additional = 100;

export async function loadRecords(
  start: number,
  end: number,
  total: number,
  direction: Direction
): Promise<any> {
  apiUrl.searchParams.set("sortBy", "type");
  let from = start,
    to = end;
  if (direction === "down") {
    to = Math.min(end + additional, total);
  } else {
    from = Math.max(0, start - additional);
  }

  apiUrl.searchParams.set("from", from.toString());
  apiUrl.searchParams.set("to", to.toString());
  const response = await (await fetch(apiUrl.href)).json();

  return response;
}
