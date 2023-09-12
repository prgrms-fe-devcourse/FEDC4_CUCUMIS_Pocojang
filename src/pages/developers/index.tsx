import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import DeveloperCardItem from '@/components/shared/developerCard';
import AvatarWithChip from '@/components/shared/avatarWithChip';
import useDevelopers from '@/components/developers/useDevelopers';

const DevelopersPage = () => {
  const { onlineDevelopers, developers } = useDevelopers();
  return (
    <Stack spacing={1} mt={1}>
      <StackStyled direction="row" spacing={4}>
        {onlineDevelopers.map((developer) => (
          <LinkStyled to={`/dm/${developer._id}`}>
            <AvatarWithChip
              key={developer._id}
              AvatarProps={developer.AvatarProps}
              label={developer.label}
            />
          </LinkStyled>
        ))}
      </StackStyled>
      {developers.map((developer) => {
        return (
          <DeveloperCardItem
            stacks={developer.stacks}
            key={developer._id}
            AvatarProps={developer.AvatarProps}
            name={developer.name}
            oneliner={developer.oneliner}
            description={developer.description}
            to={developer._id}
          />
        );
      })}
    </Stack>
  );
};

const StackStyled = styled(Stack)({
  overflowX: 'scroll',
  overflowY: 'visible',
  '&::-webkit-scrollbar': {
    width: '0',
    height: '0',
  },
});

const LinkStyled = styled(Link)({
  textDecoration: 'none',
});

export default DevelopersPage;
