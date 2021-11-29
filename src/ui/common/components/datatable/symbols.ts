import { InjectionKey } from "vue";
import { DataTableColumn, DataTableRow } from "./types";

export interface DataTableState {
  columns?: DataTableColumn[];
  rows?: DataTableRow[];
}

export const DataTableKey: InjectionKey<DataTableState> = Symbol(
  "DataTable state provider identifier"
);
