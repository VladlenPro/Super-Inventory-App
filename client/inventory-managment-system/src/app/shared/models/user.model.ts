export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    userTypes: string[];
    stores: string[];
    phone?: string;
    address?: string;
    isActive: boolean;
  }