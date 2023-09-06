import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layout/RootLayout';
import HomePage from '@/pages';
import ProjectPage from '@/pages/projects';
import ProjectDetailPage from '@/pages/projects/projectId';
import ProjectPostingPage from '@/pages/projects/write';
import ProjectUpdatePage from '@/pages/projects/writeId';
import DeveloperListPage from '@/pages/developers';
import DeveloperDetailPage from '@/pages/developers/developerId';
import DMListPage from '@/pages/dm';
import DMPage from '@/pages/dm/dmId';
import ProfilePage from '@/pages/profile';
import SettingsPage from '@/pages/settings';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup/step1';
import ExtraInformationPage from '@/pages/signup/step2';
import NotFoundPage from '@/pages/notFound';
import NotificationPage from '@/pages/notification';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
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
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'notification',
        element: <NotificationPage />,
      },
    ],
  },
]);
