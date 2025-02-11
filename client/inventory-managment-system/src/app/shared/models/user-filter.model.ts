import { BaseFilter } from "./base-filter.model";

export interface UserFilter extends BaseFilter {
    searchText: string;
    isActive: boolean | null;
  }