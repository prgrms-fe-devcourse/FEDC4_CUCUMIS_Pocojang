import api from '@/utils/api';
import type { ConversationType, MessageType } from '@/types';
import {
  RequestGetMessagesType,
  RequestReadMessagesType,
  RequestSendMessagesType,
} from '@/types/api/messages';

export const getConversations = async (): Promise<ConversationType[]> =>
  api.get<undefined, ConversationType[]>('/messages/conversations');

export const getMessages = async (
  request: RequestGetMessagesType,
): Promise<MessageType[]> =>
  api.get<RequestGetMessagesType, MessageType[]>('/messages', request);

export const sendMessage = async (
  request: RequestSendMessagesType,
): Promise<MessageType> =>
  api.post<RequestSendMessagesType, MessageType>('/messages/create', request);

export const readMessages = async (request: RequestReadMessagesType) =>
  api.put<RequestReadMessagesType, undefined>('/messages/update-seen', request);
