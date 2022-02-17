import { InjectionKey, Ref } from "vue";
import { DataTableColumn, DataTableRow } from "./types";

export interface DataTableContext {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  onResize: (columnKey: string, updatedWidth: number) => void;
}

export const DataTableKey: InjectionKey<Ref<DataTableContext>> = Symbol(
  "DataTable state provider identifier"
);
