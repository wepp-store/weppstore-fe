import { ModalProps } from '@nextui-org/react';

export interface ImageGalleryProps extends Omit<ModalProps, 'children'> {
  title?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  images: string[];
  startIndex?: number;
}
