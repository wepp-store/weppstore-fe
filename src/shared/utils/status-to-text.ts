import { WeppStatus } from '@/shared/types';

export const weppStatusToText = (status: WeppStatus | undefined): string => {
  if (status === 'DRAFT') return '작성중';
  if (status === 'RELEASED') return '출시';
  if (status === 'DELETED') return '삭제';
  if (status === 'REJECTED') return '거절';
  if (status === 'PENDING') return '대기';
  return '';
};
