
export enum Roles {
  ADMIN = 'ADMIN',
  HSSE_OPERATOR = 'HSSE-OPERATOR',
  HSSE_EMPLOYEE = 'HSSE-EMPLOYEE',
  HSSE_MANAGER = 'HSSE-MANAGER',
  REQUESTER_REGULAR = 'REQUESTER-REGULAR',
  REQUESTER_VIP = 'REQUESTER-VIP',
}


export interface User {
  id: number;
  username: string;
  email: string;
  role: Roles;
  token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}