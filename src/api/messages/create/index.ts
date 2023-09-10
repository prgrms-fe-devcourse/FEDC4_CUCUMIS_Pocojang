import api from "@/utils/api";
import type { MessageType } from "@/types";
import type { RequestBodyCreateMessagesType } from "@/types/api/messages/create/RequestBodyCreateMessagesType";

export const sendMessage = async (rq : RequestBodyCreateMessagesType): Promise<MessageType> => {
  return await api.post<RequestBodyCreateMessagesType, MessageType>("/messages/create", rq);
};