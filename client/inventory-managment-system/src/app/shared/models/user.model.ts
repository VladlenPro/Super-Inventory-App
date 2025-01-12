export interface User {
    id: string;
    password: string;
    username: string;
    userTypes: string[];
    stores: string[];
    phone?: string;
    address?: string;
    isActive: boolean;
  }