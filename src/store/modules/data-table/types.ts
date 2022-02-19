import type { DataTableColumn, UserConfig, DataTableRow } from "@/ui/common";

export interface DataTableState {
  columns: DataTableColumn[];
  rows: DataTableRow[];
}

export interface SavedConfig {
  key: string;
  config: UserConfig;
}
