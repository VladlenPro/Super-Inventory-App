import { BaseFilter } from "./base-filter.model";

export interface StoreFilter extends BaseFilter {
    searchText: string;
    isActive: boolean | null;
}