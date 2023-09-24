import { Stack, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useCallback } from 'react';

import FixedProgress from '@/components/shared/fixedPorgress';
import DeveloperCardItem from '@/components/shared/developerCard';
import AvatarWithChip from '@/components/shared/avatarWithChip';
import useDevelopers from '@/components/developers/useDevelopers';

const DevelopersPage = () => {
  const { onlineDevelopers, developers, target, isFetching, isEndOfList } =
    useDevelopers({
      onGetFail: useCallback((error: unknown) => {
        console.log(error);
      }, []),
    });
  console.log(developers);
  return (
    <>
      {isFetching && <FixedProgress />}
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
        {!isEndOfList && <Box ref={target}></Box>}
      </Stack>
    </>
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
