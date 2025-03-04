import { Store } from "../../shared/models/store.model";

export class StoreMapper {
    public static fromStoreResponsetoStore(storeResponse: Store): Store {
        return {
            id: storeResponse.id,
            name: storeResponse.name,
            branchName: storeResponse.branchName,
            address: storeResponse.address,
            isActive: storeResponse.isActive,
            products: storeResponse.products,
        }
    }
}