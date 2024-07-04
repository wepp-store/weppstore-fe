import { ICategory } from './category';
import { IUser } from './user';

interface WeppImage {
  id: number;
  url: string;
  type: 'LOGO' | 'SCREENSHOT';
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
  images: WeppImage[];
}
