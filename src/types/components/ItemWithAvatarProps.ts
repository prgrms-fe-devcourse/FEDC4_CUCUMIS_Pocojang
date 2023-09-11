import BasicAvatarProps from '@/types/components/BasicAvatarProps';

export default interface ItemWithAvatarProps {
  AvatarProps: BasicAvatarProps;
  name: string;
  message?: string;
  unReadCount?: number;
  to?: string;
  isLastItem?: boolean;
  isComment?: boolean;
}
