import { Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

import ProjectCardItem from '@/components/shared/projectCard';
import MainFab from '@/components/shared/mainFab';
import useProjectList from '@/components/ProjectList/useProjectList';

const ProjectPage = () => {
  const { handleFabClick, data } = useProjectList();

  return (
    <>
      <MainFab onClick={handleFabClick}>
        <Add />
      </MainFab>
      <Stack spacing={1}>
        {data.map((project) => (
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

// export default function ProjectPage() {
//   return (
//     <div>
//       <ul>
//         <li>
//           <Link to="/projects/1">1번 프로젝트</Link>
//         </li>
//         <li>
//           <Link to="/projects/2">2번 프로젝트</Link>
//         </li>
//         <li>
//           <Link to="/projects/3">3번 프로젝트</Link>
//         </li>
//         <li>
//           <Link to="/projects/4">4번 프로젝트</Link>
//         </li>

//         <h1>
//           <Link to="/projects/write">글쓰기</Link>
//         </h1>
//       </ul>
//     </div>
//   );
// }
