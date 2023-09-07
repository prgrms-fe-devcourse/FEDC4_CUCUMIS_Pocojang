import type { ChannelType } from '@/types';

export type ChannelsType = Pick<
  ChannelType,
  'authRequired' | 'description' | 'name'
>;
