import type { ChannelType } from '@/types';

export interface ChannelList extends ChannelType {}

export type ChannelsRequestType = Pick<
  ChannelType,
  'authRequired' | 'description' | 'name'
>;
