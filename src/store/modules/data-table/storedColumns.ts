import { getItem } from "@/helpers";

import { defaultColumns } from "./defaults";
import type { UserConfig } from "./types";

export const USER_CONFIG = "user-config";
const storedConfig = getItem(USER_CONFIG) as UserConfig[];

export const storedColumns = storedConfig
  ? defaultColumns.map((col) => ({
      ...col,
      config:
        storedConfig.find(({ key }) => key === col.key)?.config || col.config,
    }))
  : defaultColumns;
