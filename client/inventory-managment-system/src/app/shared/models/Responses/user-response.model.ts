import { User } from "../user.model";

// export interface UserResponse {
//     id: string;
//     username: string;
//     userTypes: string[];
//     stores: string[];
//     phone?: string;
//     address?: string;
//     isActive: boolean;
//   }

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UserListResponse {
  success: boolean;
  message: string;
  data: User[];
}
  