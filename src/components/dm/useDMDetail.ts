import { useCallback, useEffect, useRef, useState } from 'react';

import { getUser } from '@/api/user';
import { getMessages, sendMessage } from '@/api/messages';
import { RequestSendMessagesType } from '@/types/api/messages';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { userIdSelector } from '@/stores/auth';
import { inputSelector, setVisitingUser } from '@/stores/layout';
import {
  setMessages,
  addMessage,
  dmUserIdSelector,
  messagesSelector,
} from '@/stores/dm';
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
  const userId = useAppSelector(userIdSelector);
  const input = useAppSelector(inputSelector);
  const dmUserId = useAppSelector(dmUserIdSelector);
  const messages = useAppSelector(messagesSelector).map((message) => ({
    ...message,
    isSender: message.sender._id === userId,
  }));
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(
    async (dmUserId: string) => {
      try {
        const responseMessages = await getMessages({ userId: dmUserId });
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
    async (dmUserId: string) => {
      try {
        const visitingUser = await getUser(dmUserId);
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
    if (dmUserId) {
      fetchVisitingUser(dmUserId);
      fetchMessages(dmUserId);
    }
  }, [fetchVisitingUser, fetchMessages, dmUserId, dispatch, onGetFail]);

  useInterval(() => {
    if (dmUserId) {
      fetchMessages(dmUserId);
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
        receiver: dmUserId,
      };
      createMessage(message);
    }
  }, [input, dmUserId, dispatch, onSendFail]);

  return { messages, messageEndRef, isLoading };
};
