import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages';
import ProjectPage from '@/pages/projects';
import ProjectDetailPage from '@/pages/projects/[projectId]';
import ProjectPostingPage from '@/pages/projects/write';
import ProjectUpdatePage from '@/pages/projects/write/[writeId]';
import DeveloperListPage from '@/pages/developers';
import DeveloperDetailPage from '@/pages/developers/[developerId]';
import DMListPage from '@/pages/dm';
import DMPage from '@/pages/dm/[dmId]';
import ProfilePage from '@/pages/profile';
import SettingsPage from '@/pages/settings';
import PasswordSettingPage from '@/pages/settings/password';
import ProfileSettingPage from '@/pages/settings/profile';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup/step1';
import ExtraInformationPage from '@/pages/signup/step2';
import NotificationPage from '@/pages/notification';
import NotFoundPage from '@/pages/notFound';

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: 'projects',
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
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
                  index: true,
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
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
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
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
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
          errorElement: <NotFoundPage />,
          children: [
            {
              path: ':userId',
              element: <ProfilePage />,
            },
          ],
        },
        {
          path: 'signup',
          errorElement: <NotFoundPage />,
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
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
              element: <SettingsPage />,
            },
            {
              path: 'password',
              element: <PasswordSettingPage />,
            },
            {
              path: 'profile',
              element: <ProfileSettingPage />,
            },
          ],
        },
        {
          path: 'login',
          element: <LoginPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: 'notification',
          element: <NotificationPage />,
          errorElement: <NotFoundPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  { basename: '/' },
);
