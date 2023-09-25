import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getConversations, getMessages } from '@/api/messages';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setConversations, conversationsSelector } from '@/stores/dm';
import { userIdSelector } from '@/stores/auth';
import { setVisitingUser } from '@/stores/layout';
import { UserType } from '@/types';

interface DMListHookParameters {
  onFail: (error: unknown) => void;
}

export const useDMList = ({ onFail }: DMListHookParameters) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(userIdSelector);
  const conversations = useAppSelector(conversationsSelector);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const responseConversations = await getConversations();
      const filteredConversations = responseConversations
        .filter((conversation) => conversation._id.some((id) => id !== userId))
        .map((conversation) => {
          const conversationUser = [conversation.receiver, conversation.sender];
          const dmUser = conversationUser.find((user) => user._id !== userId);
          return { ...conversation, dmUser, unReadCount: -1 };
        });

      dispatch(setConversations(filteredConversations));

      const requests = filteredConversations.map((conversation) =>
        getMessages({ userId: conversation.dmUser?._id ?? '' }),
      );
      Promise.all(requests).then((results) => {
        const unReadCountedConversations = results.map((result) => {
          const conversationUser = [result[0].receiver, result[0].sender];
          const dmUser = conversationUser.find((user) => user._id !== userId);
          const conversationIndex = filteredConversations.findIndex(
            (conversation) => conversation.dmUser?._id === dmUser?._id,
          );
          const unReadCount = result.filter(
            (message) => message.receiver._id === userId && !message.seen,
          ).length;

          return { ...filteredConversations[conversationIndex], unReadCount };
        });

        dispatch(setConversations(unReadCountedConversations));
      });
    } catch (error) {
      onFail(error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, userId, onFail]);

  useEffect(() => {
    fetchConversations();
  }, [dispatch, fetchConversations]);

  const handleConversationClick = (dmUser: UserType) => {
    navigate(`/dm/${dmUser._id}`);
    dispatch(setVisitingUser(dmUser));
  };

  return { conversations, isLoading, handleConversationClick };
};
