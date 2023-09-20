import { Stack, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import useHome from '@/components/home/useHome';
import ProjectCardItem from '@/components/shared/projectCard';
import AvatarWithChip from '@/components/shared/avatarWithChip';

//TODO 추천 개발자 컴포넌트로 빼기,초기 두번 렌더링
const HomePage = () => {
  const { homeList, target } = useHome();
  return (
    <Stack spacing={2} mt={1}>
      {homeList.map(({ _id, projectTitle, imageUrl, name, developers }) => {
        return (
          <DivStyled key={_id}>
            <ProjectCardItem
              name={name}
              imageUrl={imageUrl}
              projectTitle={projectTitle}
              to={_id}
            />

            {developers && (
              <Box mt={2}>
                <Typography variant="body2" gutterBottom>
                  Developer Recommendation
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-evenly"
                >
                  {developers.map(({ _id: avatarId, AvatarProps, label }) => (
                    <LinkStyled to={`/developers/${avatarId}`} key={avatarId}>
                      <AvatarWithChip
                        key={avatarId}
                        AvatarProps={AvatarProps}
                        label={label}
                      />
                    </LinkStyled>
                  ))}
                </Stack>
              </Box>
            )}
          </DivStyled>
        );
      })}
      <Box ref={target}></Box>
    </Stack>
  );
};

const LinkStyled = styled(Link)({
  textDecoration: 'none',
});
const DivStyled = styled('div')({});
export default HomePage;
