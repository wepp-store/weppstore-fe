import { IWepp } from './wepp';

export interface IUser {
  id: number;
  email: string;
  kind: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  profileUrl: string | null;
  wepps: IWepp[];
}
