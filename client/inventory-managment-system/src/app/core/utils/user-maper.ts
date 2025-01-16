import { UserResponse } from "../../shared/models/Responses/user-response.model";
import { User } from "../../shared/models/user.model";

export class UserMapper {
    public static fromUserResponsetoUser(userResponse: User): User {
        return {
            id: userResponse.id,
            username: userResponse.username,
            firstName: userResponse.firstName,
            lastName: userResponse.lastName, 
            password: userResponse.password,
            userTypes: userResponse.userTypes,
            stores: userResponse.stores,
            phone: userResponse.phone,
            address: userResponse.address,
            isActive: userResponse.isActive,
        }
    }
}