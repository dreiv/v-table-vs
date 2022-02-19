import { getItem } from "@/helpers";

import { defaultColumns } from "./defaults";
import type { DataTableColumn } from "@/ui/common";
import type { SavedConfig } from "./types";

export const USER_CONFIG = "user-config";
const storedConfig = getItem<SavedConfig[]>(USER_CONFIG);

export const storedColumns = storedConfig
  ? (defaultColumns
      .map((col) => ({
        ...col,
        config: storedConfig.find(({ key }) => key === col.key)?.config,
      }))
      .sort((a, b) => a.config!.index - b.config!.index) as DataTableColumn[])
  : defaultColumns;
