import { Stack, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import useHome from '@/components/home/useHome';
import ProjectCardItem from '@/components/shared/projectCard';
import AvatarWithChip from '@/components/shared/avatarWithChip';

const HomePage = () => {
  const { projects, onlineDevelopers } = useHome();

  return (
    <Stack spacing={2}>
      {projects.map(({ _id, projectTitle, imageUrl, name }, index) => {
        if ((index + 1) % 2 !== 0) {
          return (
            <ProjectCardItem
              key={_id}
              name={name}
              imageUrl={imageUrl}
              projectTitle={projectTitle}
              to={_id}
            />
          );
        } else {
          return (
            <>
              <ProjectCardItem
                key={_id}
                name={name}
                imageUrl={imageUrl}
                projectTitle={projectTitle}
                to={_id}
              />
              <Box key={_id + '@'}>
                <Typography variant="body2" gutterBottom>
                  Developer Recommendation
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-evenly"
                >
                  {onlineDevelopers
                    .slice((index + 1) / 2 - 1, (index + 1) / 2 + 3)
                    .map(({ _id: avatarId, avatarProps, label }) => (
                      <LinkStyled to={`/dm/${avatarId}`}>
                        <AvatarWithChip
                          key={avatarId + '@@'}
                          AvatarProps={avatarProps}
                          label={label}
                        />
                      </LinkStyled>
                    ))}
                </Stack>
              </Box>
            </>
          );
        }
      })}
    </Stack>
  );
};

const LinkStyled = styled(Link)({
  textDecoration: 'none',
});

export default HomePage;
