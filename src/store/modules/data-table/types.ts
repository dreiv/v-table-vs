import { DataTableColumn, DataTableRow } from "@/ui/common";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
}

export interface UserConfig {
  key: string;
  config: {
    width: number;
  };
}
