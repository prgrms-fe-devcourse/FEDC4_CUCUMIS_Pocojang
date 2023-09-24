import { Stack, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useCallback } from 'react';

import FixedProgress from '@/components/shared/fixedPorgress';
import ProjectCardItem from '@/components/shared/projectCard';
import MainFab from '@/components/shared/mainFab';
import useProjectList from '@/components/ProjectList/useProjectList';

const ProjectPage = () => {
  const { handleFabClick, projects, target, isLogin, isFetching, isEndOfList } =
    useProjectList({
      onGetFail: useCallback((error: unknown) => {
        console.log(error);
      }, []),
    });

  return (
    <>
      {isFetching && <FixedProgress />}
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

export default ProjectPage;
