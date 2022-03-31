import { defineStore } from "pinia";

import { Direction } from "@/ui/common";
import { setItem } from "@/helpers";
import { loadRecords } from "@/services";
import { USER_CONFIG, storedColumns } from "./storedColumns";
import type { DataTableState } from "./types";

function initArray(length: number) {
  return Array.from({ length }, (_, index) => ({
    id: index.toString(),
    loading: true,
  }));
}

let timeout: any;
export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: storedColumns,
    rows: [],
    shownRows: [],
    total: 0,
  }),

  actions: {
    fetchRows(offset: number, count: number, direction: Direction) {
      clearTimeout(timeout);
      if (!this.rows.length) {
        this.rows = initArray(count);
        this.total = count;
      }
      const start = Math.max(0, offset);
      const end = Math.min(offset + count, this.total);
      this.shownRows = this.rows.slice(start, end);

      if (this.shownRows.find(({ loading }) => loading)) {
        timeout = setTimeout(async () => {
          const { records, total } = await loadRecords(
            start,
            end,
            this.total,
            direction
          );
          this.total = total;
          if (this.rows.length !== total) {
            this.rows = initArray(total);
          }

          this.rows.splice(start, records.length, ...records);
          this.shownRows = this.rows.slice(start, end);
        }, 300);
      }
    },

    resizeColumn(key: string, diff: number) {
      const cols = [...this.columns];
      const resizedCfg = cols.find((c) => key === c.key)!.config;
      resizedCfg.width += diff;

      this.columns = cols;
    },

    swapColumns(from: string, to: string) {
      const cols = [...this.columns];
      const fromCfg = cols.find(({ key }) => key === from)!.config;
      const toCfg = cols.find(({ key }) => key === to)!.config;

      [fromCfg.index, toCfg.index] = [toCfg.index, fromCfg.index];
      this.columns = cols.sort((a, b) => a.config!.index - b.config!.index);
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
