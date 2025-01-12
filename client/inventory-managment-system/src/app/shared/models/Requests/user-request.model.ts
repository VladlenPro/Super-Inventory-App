import { User } from "../user.model";

export interface UserRequest extends Omit<User, 'id'> {
    id?: string; 
  }