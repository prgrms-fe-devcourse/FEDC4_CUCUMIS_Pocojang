import { Link, createBrowserRouter } from 'react-router-dom';

import MainPage from '@/pages/MainPage';
import ProjectPage from '@/pages/project/ProjectPage';
import ProjectDetailPage from '@/pages/project/ProjectDetailPage';
import ProjectPostingPage from '@/pages/project/ProjectPostingPage';
import ProjectUpdatePage from '@/pages/project/ProjectUpdatePage';
import DeveloperListPage from '@/pages/developer/DeveloperListPage';
import DeveloperDetailPage from '@/pages/developer/DeveloperDetailPage';
import DMListPage from '@/pages/dm/DMListPage';
import DMPage from '@/pages/dm/DMPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import SettingsPage from '@/pages/settings/SettingsPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import ExtraInformationPage from '@/pages/auth/ExtraInformationPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import NotificationPage from '@/pages/notification/NotificationPage';

// 각 페이지별 라우팅 모듈화
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
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
        element: <ProjectDetailPage />,
      },
      {
        path: '/projects/write',
        element: <ProjectPostingPage />,
      },
      {
        path: '/projects/write/:projectId',
        element: <ProjectUpdatePage />,
      },
      {
        path: '/developers',
        element: <DeveloperListPage />,
      },
      {
        path: '/developers/:developerId',
        element: <DeveloperDetailPage />,
      },
      {
        path: '/dm',
        element: <DMListPage />,
      },
      {
        path: '/dm/:dmId',
        element: <DMPage />,
      },
      {
        path: '/profile/:userId',
        element: <ProfilePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup/step1',
        element: <SignupPage />,
      },
      {
        path: '/signup/step2',
        element: <ExtraInformationPage />,
      },
      {
        path: '/notification',
        element: <NotificationPage />,
      },
    ],
  },
]);
