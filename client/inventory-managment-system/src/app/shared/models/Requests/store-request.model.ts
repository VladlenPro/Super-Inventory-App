import { Store } from "../store.model";

export interface StoreRequest extends Omit<Store, 'id'> {
    id?: string;
}