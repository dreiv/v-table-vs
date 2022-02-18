import { getItem } from "@/helpers";

import { defaultColumns } from "./defaults";
import type { UserConfig } from "./types";

export const USER_CONFIG = "user-config";
const storedConfig = getItem<UserConfig[]>(USER_CONFIG);

export const storedColumns = storedConfig
  ? defaultColumns.map((col) => ({
      ...col,
      config: storedConfig.find(({ key }) => key === col.key)?.config,
    }))
  : defaultColumns;
