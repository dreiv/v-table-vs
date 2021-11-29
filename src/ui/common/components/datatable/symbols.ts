import { InjectionKey, Ref } from "vue";
import { DataTableColumn, DataTableRow } from "./types";

export interface DataTableContext {
  columns: DataTableColumn[];
  rows: DataTableRow[];
}

export const DataTableKey: InjectionKey<Ref<DataTableContext>> = Symbol(
  "DataTable state provider identifier"
);
