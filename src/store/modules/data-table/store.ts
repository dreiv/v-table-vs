import { defineStore } from "pinia";

import { DataTableState } from "./types";
import { defaultColumns } from "./defaults";

export const useDataTableStore = defineStore("dataTableStore", {
  state: (): DataTableState => ({
    columns: defaultColumns,
  }),
});
