import { Link, createBrowserRouter } from 'react-router-dom';

import MainPage from '@/pages/MainPage';
import ProjectPage from '@/pages/project/ProjectPage';
import ProjectDetail from '@/pages/project/ProjectDetail';
import ProjectPosting from '@/pages/project/ProjectPosting';
import ProjectUpdate from '@/pages/project/ProjectUpdate';
import DeveloperList from '@/pages/developer/DeveloperList';
import DeveloperDetail from '@/pages/developer/DeveloperDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <h1>404 page = 따로 만들어줘야 돼!</h1>,
    children: [
      {
        index: true, // /페이지
        element: (
          <ul>
            <li>
              <Link to="/projects/1">1번 프로젝트</Link>
            </li>
            <li>
              <Link to="/projects/2">2번 프로젝트</Link>
            </li>
            <li>
              <Link to="/developers/1">1번 개발자</Link>
            </li>
            <li>
              <Link to="/developers/2">2번 개발자</Link>
            </li>
            <li>
              <Link to="/developers/2">2번 개발자</Link>
            </li>
          </ul>
        ),
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
      {
        path: '/projects/:projectId',
        element: <ProjectDetail />,
      },
      {
        path: '/projects/write',
        element: <ProjectPosting />,
      },
      {
        path: '/projects/write/:projectId',
        element: <ProjectUpdate />,
      },
      {
        path: '/developers',
        element: <DeveloperList />,
      },
      {
        path: '/developers/:developerId',
        element: <DeveloperDetail />,
      },
    ],
  },
]);
