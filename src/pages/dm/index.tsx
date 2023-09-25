import { useCallback } from 'react';
import styled from '@emotion/styled';
import List from '@mui/material/List';
import LinearProgress from '@mui/material/LinearProgress';

import { useDMList } from '@/components/dm/useDMList';
import ItemWithAvatar from '@/components/shared/itemWithAvatar';

export default function DMListPage() {
  const { conversations, isLoading, handleConversationClick } = useDMList({
    onFail: useCallback((error: unknown) => {
      // TODO: conversations 불러오기 실패 알림
      console.error(error);
    }, []),
  });

  return isLoading ? (
    <LinearProgress />
  ) : (
    <ListStyled>
      {conversations &&
        conversations.map(({ dmUser, message, unReadCount }) => (
          <ItemWithAvatar
            name={dmUser.fullName}
            message={message}
            unReadCount={unReadCount}
            onClick={() => handleConversationClick(dmUser)}
            AvatarProps={{ imgSrc: dmUser.image }}
            key={dmUser._id}
          />
        ))}
    </ListStyled>
  );
}

const ListStyled = styled(List)({
  padding: 0,
  '.MuiDivider-root': {
    margin: 0,
  },
});
