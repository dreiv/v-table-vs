export interface DataTableColumn {
  key: string;
  text: string;
  config: {
    width: number;
  };
}

export interface DataTableRow {
  id: string;
  [key: string]: any;
}
