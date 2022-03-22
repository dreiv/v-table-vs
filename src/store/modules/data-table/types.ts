import type { DataTableColumn, UserConfig, DataTableRow } from "@/ui/common";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  shownRows: DataTableRow[];
  total: number;
}

export interface SavedConfig {
  key: string;
  config: UserConfig;
}
