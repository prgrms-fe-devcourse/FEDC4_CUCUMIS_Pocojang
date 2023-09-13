import { useNavigate } from 'react-router-dom';

export const useDMList = () => {
  const navigate = useNavigate();

  const conversations = [
    {
      _id: '1',
      AvatarProps: {
        onClick: () => navigate('/profile/user1'),
        isUserOn: true,
      },
      name: 'user1',
      message: 'Hello, World! 🤗',
      to: 'user1',
      unReadCount: 1000,
    },
    {
      _id: '2',
      AvatarProps: {
        onClick: () => navigate('/profile/user2'),
      },
      name: 'user2',
      message: 'Hi!',
      to: 'user2',
      unReadCount: 1001,
    },
    {
      _id: '3',
      AvatarProps: {
        onClick: () => navigate('/profile/user3'),
        isUserOn: true,
      },
      name: 'user3',
      message: '같이 프로젝트 진행하고 싶습니다!',
      to: 'user3',
      unReadCount: 0,
    },
    {
      _id: '4',
      AvatarProps: {
        onClick: () => navigate('/profile/user4'),
      },
      name: 'user4',
      message: '감사합니다!',
      to: 'user4',
      unReadCount: 0,
    },
    {
      _id: '5',
      AvatarProps: {
        onClick: () => navigate('/profile/user5'),
      },
      name: 'user5',
      message: '안녕하세요 :)',
      to: 'user5',
      unReadCount: 1,
    },
  ];

  return { conversations };
};
