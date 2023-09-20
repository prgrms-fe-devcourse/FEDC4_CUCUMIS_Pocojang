import { Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import ProjectCardItem from '@/components/shared/projectCard';
import MainFab from '@/components/shared/mainFab';
import useProjectList from '@/components/ProjectList/useProjectList';

//TODO전체 페이지 길이 초과시 api요청막기,
/*
형태 변환은 project의 title에 JSON을 parse해서 
title이 projectTitle, 검색 후 요청 넣기 

*/
const ProjectPage = () => {
  const { handleFabClick, projects, target, isLogin } = useProjectList();
  return (
    <>
      {isLogin && (
        <MainFab onClick={handleFabClick}>
          <Add />
        </MainFab>
      )}
      <Stack spacing={1} ref={target}>
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
    </>
  );
};

export default ProjectPage;
