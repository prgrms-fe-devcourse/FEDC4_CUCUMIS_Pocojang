import { createBrowserRouter } from 'react-router-dom';

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
import HomePage from '@/pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // /페이지
        element: <HomePage />,
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            element: <ProjectPage />,
          },
          {
            path: ':projectId',
            element: <ProjectDetailPage />,
          },
          {
            path: 'write',
            children: [
              {
                path: '',
                element: <ProjectPostingPage />,
              },
              {
                path: ':projectId',
                element: <ProjectUpdatePage />,
              },
            ],
          },
        ],
      },
      {
        path: 'developers',
        children: [
          {
            path: '',
            element: <DeveloperListPage />,
          },
          {
            path: ':developerId',
            element: <DeveloperDetailPage />,
          },
        ],
      },
      {
        path: 'dm',
        children: [
          {
            path: '',
            element: <DMListPage />,
          },
          {
            path: ':dmId',
            element: <DMPage />,
          },
        ],
      },
      {
        path: 'profile',
        children: [
          {
            path: ':userId',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: 'signup',
        children: [
          {
            path: 'step1',
            element: <SignupPage />,
          },
          {
            path: 'step2',
            element: <ExtraInformationPage />,
          },
        ],
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/notification',
        element: <NotificationPage />,
      },
    ],
  },
]);
