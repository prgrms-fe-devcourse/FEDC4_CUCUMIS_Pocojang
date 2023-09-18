import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import DeveloperCardItem from '@/components/shared/developerCard';
import AvatarWithChip from '@/components/shared/avatarWithChip';
import useDevelopers from '@/components/developers/useDevelopers';

const DevelopersPage = () => {
  const { onlineDevelopers, developers } = useDevelopers();

  console.log(onlineDevelopers, developers);
  return (
    <Stack spacing={1} mt={1}>
      <StackStyled direction="row" spacing={4}>
        {onlineDevelopers.map((developer) => (
          <LinkStyled key={developer._id} to={`/dm/${developer._id}`}>
            <AvatarWithChip
              AvatarProps={developer.AvatarProps}
              label={developer.label}
            />
          </LinkStyled>
        ))}
      </StackStyled>
      {developers.map((developer) => {
        return (
          <DeveloperCardItem
            key={developer._id}
            techStack={developer.techStack}
            AvatarProps={developer.AvatarProps}
            name={developer.name}
            oneLiner={developer.oneLiner}
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
