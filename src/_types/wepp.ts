import { ICategory } from './category';
import { IUser } from './user';

interface WeppScreenshot {
  id: number;
  url: string;
  style: string;
  order: number;
}

export interface IWepp {
  id: number;
  developerId: number;
  developer: IUser;
  name: string;
  description: string;
  status: 'DRAFT' | 'RELEASED' | 'DELETED' | 'REJECTED' | 'PENDING';
  url: string;
  createdAt: string;
  updatedAt: string;
  categories: ICategory[];
  logo: string | null;
  screenshots: WeppScreenshot[];
  version: string;
}
