import { Stack, Box, LinearProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useCallback } from 'react';

import ProjectCardItem from '@/components/shared/projectCard';
import MainFab from '@/components/shared/mainFab';
import useProjectList from '@/components/ProjectList/useProjectList';
//TODO

const ProjectPage = () => {
  const { handleFabClick, projects, target, isLogin, isFetching, isEndOfList } =
    useProjectList({
      onGetFail: useCallback((error: unknown) => {
        console.log(error);
      }, []),
    });

  console.log(projects, isFetching);
  return (
    <>
      {isFetching && (
        <BoxStyled>
          <LinearProgressStyled />
        </BoxStyled>
      )}
      {isLogin && (
        <MainFab onClick={handleFabClick}>
          <Add />
        </MainFab>
      )}

      <Stack spacing={1}>
        {projects &&
          projects.map((project) => (
            <ProjectCardItem
              key={project._id}
              name={project.name}
              imageUrl={project.image}
              projectTitle={project.projectTitle}
              to={project._id}
            />
          ))}
      </Stack>
      {!isEndOfList && <Box ref={target}></Box>}
    </>
  );
};
const BoxStyled = styled(Box)({
  zIndex: '10',
  maxWidth: '600px',
  top: '0',
  height: '66px',
  width: '100%',
  position: 'fixed',
  left: '50%',
  transform: 'translate(-50%)',
  pointerEvents: 'none',
});
const LinearProgressStyled = styled(LinearProgress)({
  position: 'absolute',
  bottom: '0',
  height: '10px',
  width: '100%',
});

export default ProjectPage;
