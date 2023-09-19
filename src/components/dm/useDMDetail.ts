import { useCallback, useEffect, useRef, useState } from 'react';

import { getUser } from '@/api/user';
import { getMessages, sendMessage } from '@/api/messages';
import { RequestSendMessagesType } from '@/types/api/messages';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { userIdSelector } from '@/stores/auth';
import {
  locationSelector,
  inputSelector,
  setVisitingUser,
} from '@/stores/layout';
import { setMessages, addMessage, messagesSelector } from '@/stores/dm';
import useInterval from '@/hooks/useInterval';

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
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(
    async (visitingUserId: string) => {
      try {
        const responseMessages = await getMessages({ userId: visitingUserId });
        if (responseMessages.length > messages.length) {
          dispatch(setMessages(responseMessages));
        }
      } catch (error) {
        // TODO: message 불러오기 실패
        onGetFail(error);
      }
    },
    [messages, dispatch, onGetFail],
  );

  const fetchVisitingUser = useCallback(
    async (visitingUserId: string) => {
      try {
        const visitingUser = await getUser(visitingUserId);
        dispatch(setVisitingUser(visitingUser));
      } catch (error) {
        // TODO: message 불러오기 실패
        onGetFail(error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, onGetFail],
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (visitingUserId) {
      fetchVisitingUser(visitingUserId);
      fetchMessages(visitingUserId);
    }
  }, [fetchVisitingUser, fetchMessages, visitingUserId, dispatch, onGetFail]);

  useInterval(() => {
    if (visitingUserId) {
      fetchMessages(visitingUserId);
    }
  }, 3000);

  useEffect(() => {
    const createMessage = async (rq: RequestSendMessagesType) => {
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

  return { messages, messageEndRef, isLoading };
};
