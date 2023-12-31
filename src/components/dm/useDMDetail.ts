import { useCallback, useEffect, useRef, useState } from 'react';

import { getUser } from '@/api/user';
import { getMessages, readMessages, sendMessage } from '@/api/messages';
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
  const [isInterval, setIsInterval] = useState(false);

  const fetchMessages = useCallback(
    async (dmUserId: string) => {
      try {
        const responseMessages = await getMessages({ userId: dmUserId });
        const sortedMessages = responseMessages.sort(
          (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt),
        );
        dispatch(setMessages(sortedMessages));
      } catch (error) {
        // TODO: message 불러오기 실패
        onGetFail(error);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, onGetFail],
  );

  const fetchVisitingUser = useCallback(
    async (dmUserId: string) => {
      try {
        const visitingUser = await getUser(dmUserId);
        dispatch(setVisitingUser(visitingUser));
      } catch (error) {
        // TODO: message 불러오기 실패
        onGetFail(error);
      }
    },
    [dispatch, onGetFail],
  );

  const updateMessagesSeen = useCallback(
    async (dmUserId: string) => {
      try {
        await readMessages({ sender: dmUserId });
      } catch (error) {
        onGetFail(error);
      }
    },
    [onGetFail],
  );

  useEffect(() => {
    if (!isInterval) {
      messageEndRef.current?.scrollIntoView();
    }
  }, [isInterval, messages]);

  useEffect(() => {
    if (dmUserId) {
      fetchMessages(dmUserId);
      fetchVisitingUser(dmUserId);
      updateMessagesSeen(dmUserId);
    }
  }, [
    dmUserId,
    dispatch,
    fetchMessages,
    fetchVisitingUser,
    updateMessagesSeen,
  ]);

  useInterval(() => {
    if (dmUserId) {
      fetchMessages(dmUserId);
      updateMessagesSeen(dmUserId);
      setIsInterval(true);
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
      setIsInterval(false);
    }
  }, [input, dmUserId, dispatch, onSendFail]);

  return { messages, messageEndRef, isLoading };
};
