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
  id: string;
  developerId: number;
  developer: IUser;
  name: string;
  description: string;
  tagLine: string | null;
  status: WeppStatus;
  url: string;
  createdAt: string;
  updatedAt: string;
  releasedAt: string | null;
  categories: ICategory[];
  logo: string | null;
  screenshots: WeppScreenshot[];
  version: string;
  views: number;
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isVerified: boolean;
  otherDevelopers: IUser[];
  _count?: {
    comments: number;
    likes: number;
  };
}
