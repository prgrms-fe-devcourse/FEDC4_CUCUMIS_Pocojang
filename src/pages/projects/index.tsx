import { Stack } from '@mui/material';

import ProjectCardItem from '@/components/shared/projectCard';
//TODO  floating button 위치 수정 필요(포지션, 위치수정 가능하도록),<Divider> shared에 만들기
const ProjectPage = () => {
  return (
    <>
      <Stack spacing={3}>
        {dummyProjects.map((project, index) => (
          <ProjectCardItem
            name={project.name}
            imageUrl={project.imageUrl}
            projectTitle={project.projectTitle}
            to={(index + 1).toString()}
          />
        ))}
      </Stack>
    </>
  );
};

export default ProjectPage;

const dummyProjects = [
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
  {
    name: '저쩌구씨',
    projectTitle: 'ProjectA',
    imageUrl: 'https://source.unsplash.com/random',
  },
];

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
