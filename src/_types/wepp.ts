import { ICategory } from './category';
import { IUser } from './user';

interface WeppScreenshot {
  id?: number;
  url: string;
  style: string;
  order: number;
}

export type WeppStatus =
  | 'DRAFT'
  | 'RELEASED'
  | 'DELETED'
  | 'REJECTED'
  | 'PENDING';

export interface IWepp {
  id: number;
  developerId: number;
  developer: IUser;
  name: string;
  description: string;
  status: WeppStatus;
  url: string;
  createdAt: string;
  updatedAt: string;
  categories: ICategory[];
  logo: string | null;
  screenshots: WeppScreenshot[];
  version: string;
}
