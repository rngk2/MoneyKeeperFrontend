import { Total } from "../store/chart/types";

export const extractNames = (total: Total | undefined): string[] | undefined => {
  return total ? Object.keys(total) : undefined;
};

export const extractAmounts = (total: Total | undefined): number[] | undefined => {
  return total ? Object.values(total) : undefined;
};
