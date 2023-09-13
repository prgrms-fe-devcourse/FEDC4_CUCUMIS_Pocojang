import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';

import useDMDetail from '@/components/dm/useDMDetail';
import Message from '@/components/dm/message';

export default function DMPage() {
  const { messages } = useDMDetail();

  return (
    <StackStyled
      direction="column"
      justifyContent="flex-end"
      alignItems="stretch"
      spacing={0}
    >
      {messages.map((data) => (
        <Message
          message={data.message}
          isSender={data.isSender}
          key={data._id}
        />
      ))}
    </StackStyled>
  );
}

const StackStyled = styled(Stack)({
  minHeight: 'calc(100vh - 120px);',
});
