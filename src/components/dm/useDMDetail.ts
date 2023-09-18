import { useEffect } from 'react';

import { getUserId } from '@/api/users/userId';
import { messagesList } from '@/api/messages';
import { sendMessage } from '@/api/messages/create';
import { RequestBodyCreateMessagesType } from '@/types/api/messages/create/RequestBodyCreateMessagesType';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { userIdSelector } from '@/stores/auth';
import {
  locationSelector,
  inputSelector,
  setVisitingUser,
} from '@/stores/layout';
import { setMessages, addMessage, messagesSelector } from '@/stores/dm';

interface DMDetailHookParameters {
  onGetFail: (error: unknown) => void;
  onSendFail: (error: unknown) => void;
}

export const useDMDetail = ({
  onGetFail,
  onSendFail,
}: DMDetailHookParameters) => {
  const dispatch = useAppDispatch();
  const visitingUserId = useAppSelector(locationSelector).split('/')[2];
  const userId = useAppSelector(userIdSelector);
  const input = useAppSelector(inputSelector);
  const messages = useAppSelector(messagesSelector).map((message) => ({
    ...message,
    isSender: message.sender._id === userId,
  }));

  useEffect(() => {
    const getDetails = async (visitingUserId: string) => {
      try {
        const visitingUser = await getUserId(visitingUserId);
        const messageList = await messagesList({ userId: visitingUserId });
        dispatch(setVisitingUser(visitingUser));
        dispatch(setMessages(messageList));
      } catch (error) {
        // TODO: message 불러오기 실패
        onGetFail(error);
      }
    };

    dispatch(setVisitingUser({}));
    dispatch(setMessages([]));
    if (visitingUserId) {
      getDetails(visitingUserId);
    }
  }, [visitingUserId, dispatch, onGetFail]);

  useEffect(() => {
    const createMessage = async (rq: RequestBodyCreateMessagesType) => {
      try {
        const message = await sendMessage(rq);
        dispatch(addMessage(message));
      } catch (error) {
        // TODO: message 보내기 실패
        onSendFail(error);
      }
    };

    if (input) {
      const message = {
        message: input,
        receiver: visitingUserId,
      };
      createMessage(message);
    }
  }, [input, visitingUserId, dispatch, onSendFail]);

  return { messages };
};
