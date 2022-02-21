import { defineStore } from "pinia";

import { setItem } from "@/helpers";
import { USER_CONFIG, storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

const apiUrl = new URL("http://127.0.0.1:4040");

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
  }),

  actions: {
    async fetchRows(sortBy: string) {
      apiUrl.searchParams.append("sortBy", sortBy);
      const { records } = await (await fetch(apiUrl.href)).json();

      this.rows = records;
    },

    resizeColumn(key: string, diff: number) {
      const columnsCopy = [...this.columns];
      const resizedIdx = this.columns.findIndex((col) => key === col.key);
      columnsCopy[resizedIdx].config.width += diff;

      this.columns = columnsCopy;
    },

    swapColumns(from: string, to: string) {
      const columnsCopy = [...this.columns];
      const fromIdx = this.columns.findIndex(({ key }) => key === from);
      const toIdx = this.columns.findIndex(({ key }) => key === to);

      [columnsCopy[fromIdx].config.index, columnsCopy[toIdx].config.index] = [
        columnsCopy[toIdx].config.index,
        columnsCopy[fromIdx].config.index,
      ];

      this.columns = columnsCopy.sort(
        (a, b) => a.config!.index - b.config!.index
      );
    },

    persistOnUnload() {
      window.addEventListener("beforeunload", () => {
        setItem(
          USER_CONFIG,
          this.columns.map(({ key, config }) => ({ key, config }))
        );
      });
    },
  },
});
