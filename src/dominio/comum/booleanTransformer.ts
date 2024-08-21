import { ValueTransformer } from "typeorm";

export const BooleanTransformer: ValueTransformer = {
  to(value: boolean | string | null): number | null {
    if (typeof value === "string") {
      return value.toLowerCase() === "true" ? 1 : 0;
    }
    return value ? 1 : 0;
  },
  from(value: number | null): boolean | null {
    return value === 1;
  },
};
