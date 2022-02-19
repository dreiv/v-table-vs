import type { DataTableColumn } from "@/ui/common";

export const defaultColumns: DataTableColumn[] = [
  {
    key: "company",
    text: "Company",
    config: {
      width: 140,
      index: 0,
    },
  },
  {
    key: "contact",
    text: "Contact",
    config: {
      width: 120,
      index: 1,
    },
  },
  {
    key: "email",
    text: "Email",
    config: {
      width: 256,
      index: 2,
    },
  },
  {
    key: "phone",
    text: "Phone",
    config: {
      width: 96,
      index: 3,
    },
  },
  {
    key: "country",
    text: "Country",
    config: {
      width: 140,
      index: 4,
    },
  },
  {
    key: "city",
    text: "City",
    config: {
      width: 148,
      index: 5,
    },
  },
  {
    key: "street",
    text: "Street",
    config: {
      width: 96,
      index: 6,
    },
  },
];
