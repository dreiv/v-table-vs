import { InjectionKey, Ref } from "vue";
import type { DataTableColumn, DataTableRow } from "./types";

export interface DataTableContext {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  vScroll: {
    beforeHeight: number;
    afterHeight: number;
  };
  onResize: (key: string, diff: number) => void;
  onSwap: (from: string, to: string) => void;
}

export const DataTableKey: InjectionKey<Ref<DataTableContext>> = Symbol(
  "DataTable state provider identifier"
);
