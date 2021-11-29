export interface DataTableColumn {
  key: string;
  text: string;
}
export interface DataTableRow {
  id: string;
  [key: string]: any;
}
