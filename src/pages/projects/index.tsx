import { Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import ProjectCardItem from '@/components/shared/projectCard';
import MainFab from '@/components/shared/mainFab';
import useProjectList from '@/components/ProjectList/useProjectList';

const ProjectPage = () => {
  const { handleFabClick, projects } = useProjectList();

  return (
    <>
      <MainFab onClick={handleFabClick}>
        <Add />
      </MainFab>
      <Stack spacing={1}>
        {projects.map((project) => (
          <ProjectCardItem
            key={project._id}
            name={project.name}
            imageUrl={project.imageUrl}
            projectTitle={project.projectTitle}
            to={project._id}
          />
        ))}
      </Stack>
    </>
  );
};

export default ProjectPage;
