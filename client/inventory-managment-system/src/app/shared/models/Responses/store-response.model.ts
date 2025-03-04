import { Store } from "../store.model";

export interface StoreResponse {
  success: boolean;
  message: string;
  data: Store;
  resultType?: string;
}

export interface StoreListResponse {
  success: boolean;
  message: string;
  data: Store[];
}