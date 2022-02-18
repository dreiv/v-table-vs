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

    resizeColumn(columnKey: string, updatedWidth: number) {
      this.columns = this.columns.map((column) =>
        column.key === columnKey
          ? {
              ...column,
              config: {
                width: column.config.width + updatedWidth,
              },
            }
          : column
      );
    },

    persistOnUnload() {
      window.addEventListener("beforeunload", () => {
        setItem(
          USER_CONFIG,
          this.columns.map(({ key, config }) => ({
            key,
            config,
          }))
        );
      });
    },
  },
});
