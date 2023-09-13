import { List } from '@mui/material';
import styled from '@emotion/styled';

import ItemWithAvatar from '@/components/shared/itemWithAvatar';
import { useDMList } from '@/components/dm/useDMList';

export default function DMListPage() {
  const { conversations } = useDMList();

  return (
    <ListStyled>
      {conversations.map((conversation) => (
        <ItemWithAvatar key={conversation._id} {...conversation} />
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
