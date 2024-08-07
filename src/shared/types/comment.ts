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
  createdAt: string;
  updatedAt: string;
  parentId?: number;
  _count: {
    children: number;
  };
}
