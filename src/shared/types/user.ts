export interface IUser {
  id: number;
  email: string;
  kind: 'DEVELOPER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  // wepps: Wepp[];
}
