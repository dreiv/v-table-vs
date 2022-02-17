import { defineStore } from "pinia";

import { API } from "@/mock/api";

import { DataTableState } from "./types";
import { defaultColumns } from "./defaults";

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: defaultColumns,
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
              width: column.width + updatedWidth,
            }
          : column
      );
    },
  },
});
