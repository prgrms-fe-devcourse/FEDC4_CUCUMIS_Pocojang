import { ReactNode } from 'react';

import BasicAvatarProps from '@/types/components/BasicAvatarProps';

export default interface ItemWithAvatarProps {
  children?: ReactNode;
  AvatarProps: BasicAvatarProps;
  name: string;
  message?: string;
  unReadCount?: number;
  to?: string;
  isLastItem?: boolean;
  isComment?: boolean;
  onClick?: () => void;
}
