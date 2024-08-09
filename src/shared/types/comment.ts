import { IUser } from './user';
import { IWepp } from './wepp';

export interface IComment {
  id: number;
  content: string;
  rating: number;
  userId: number;
  weppId: number;
  user: IUser;
  wepp: IWepp;
  mention?: string;
  createdAt: string;
  updatedAt: string;
  parentId?: number;
  deletedAt?: string;
  _count: {
    children: number;
  };
}
