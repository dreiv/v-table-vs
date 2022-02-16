export interface DataTableColumn {
  key: string;
  text: string;
  width: number;
}
export interface DataTableRow {
  id: string;
  [key: string]: any;
}
