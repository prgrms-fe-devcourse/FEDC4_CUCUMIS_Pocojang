import api from '@/utils/api';
import type { ConversationType } from '@/types';

export const callMessageBox = async (): Promise<ConversationType> => {
  return await api.post<null, ConversationType>('/messages/conversations');
};