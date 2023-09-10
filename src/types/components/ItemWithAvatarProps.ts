import BasicAvatarProps from '@/types/components/BasicAvatarProps';

export interface ItemWithAvatarProps extends BasicAvatarProps {
  name: string;
  message?: string;
  unReadCount?: number;
  moveTo?: string;
  isLastItem?: boolean;
  isComment?: boolean;
}
