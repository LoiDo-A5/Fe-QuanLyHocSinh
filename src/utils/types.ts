export interface User {
  id: string;
  full_name: string;
  gender: number; 
  birthday: string; 
  address: string;
  email: string;
  avatar: string;
  phone_number: string;
  username: string;
}

  
  export interface Account {
    token: string;
    user: User;
    customer: Record<string, any>;
  }
  
  export interface AuthState {
    errorMsg: string;
    isLoggedIn: boolean;
    account: Account;
  }
  
  export interface RootState {
    auth: AuthState;
  }

  export interface Message {
    user: User;
    message: string;
  }