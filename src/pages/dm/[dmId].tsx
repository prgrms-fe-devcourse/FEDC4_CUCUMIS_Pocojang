import { useCallback } from 'react';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';

import { useDMDetail } from '@/components/dm/useDMDetail';
import Message from '@/components/dm/message';

export default function DMDetailPage() {
  const { messages, messageEndRef } = useDMDetail({
    onGetFail: useCallback((error: unknown) => {
      // TODO: message 불러오기 실패 알림
      console.error(error);
    }, []),
    onSendFail: useCallback((error: unknown) => {
      // TODO: message 보내기 실패 알림
      console.error(error);
    }, []),
  });

  return (
    <StackStyled
      direction="column"
      justifyContent="flex-end"
      alignItems="stretch"
      spacing={0}
    >
      {messages &&
        messages.map((message) => (
          <Message
            message={message.message}
            isSender={message.isSender}
            key={message._id}
          />
        ))}
      <div ref={messageEndRef}></div>
    </StackStyled>
  );
}

const StackStyled = styled(Stack)({
  minHeight: 'calc(100vh - 120px)',
  marginTop: '20px',
});
