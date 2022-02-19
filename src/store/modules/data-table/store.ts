import { defineStore } from "pinia";

import { API } from "@/mock/api";
import { setItem } from "@/helpers";
import { USER_CONFIG, storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
  }),

  actions: {
    async fetchRows() {
      const { records } = await API.fetch();

      this.rows = records;
    },

    resizeColumn(columnKey: string, diff: number) {
      const columnsCopy = [...this.columns];
      const resizedIdx = this.columns.findIndex(({ key }) => key === columnKey);
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
