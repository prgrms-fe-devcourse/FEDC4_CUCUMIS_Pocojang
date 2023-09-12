import { useNavigate, useParams } from 'react-router-dom';

const useDetails = () => {
  const { projectId, developerId } = useParams();

  const navigate = useNavigate();

  const onClick = (url: string, id: string) => {
    navigate(url + id);
  };

  const isAuthor = true;

  let data = null;
  // useState로 다루기 위해서는 initial type 정의가 필요해 일단 data로 두었습니다

  if (projectId) {
    data = DUMMY_DATA1;
  } else {
    data = DUMMY_DATA2;
  }

  return {
    projectId,
    developerId,
    onClick,
    isAuthor,
    ...data,
  };
};

export default useDetails;

const DUMMY_DATA1 = {
  likes: [],
  comments: [
    {
      AvatarProps: {
        isUserOn: true,
      },
      _id: '2',
      author: '작성자2',
      createdAt: '2022.03.14 00:00',
      comment:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',
    },
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: '3',
      createdAt: '2022.03.14 00:00',
      author: '작성자3',
      comment:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',

      isLastItem: true,
    },
  ],
  _id: '1',
  image: '/assets/Logo96.svg',
  author: {
    image:
      'https://img.freepik.com/free-photo/world-smile-day-emojis-arrangement_23-2149024491.jpg?q=10&h=200',
    isUserOn: true,
    fullName: '사용자1',
    _id: '1',
  },
  createdAt: '2022.03.14 00:00',
  updatedAt: '2022.03.14 00:00',
  title: 'This is TitleThis is TitleThis is TitleThis is TitleThis is Title',
  contents: `We need DesignerIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
};

const DUMMY_DATA2 = {
  comments: [
    {
      AvatarProps: {
        isUserOn: true,
      },
      _id: '5',
      author: '작성자5',
      createdAt: '2022.03.14 00:00',
      comment:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',
    },
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: '6',
      createdAt: '2022.03.14 00:00',
      author: '작성자6',
      comment:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',

      isLastItem: true,
    },
  ],
  _id: '1',
  image: '/assets/Logo96.svg',
  author: {
    image:
      'https://img.freepik.com/free-photo/world-smile-day-emojis-arrangement_23-2149024491.jpg?q=10&h=200',
    isUserOn: true,
    fullName: '사용자4',
    _id: '4',
  },
  createdAt: '2022.03.14 00:00',
  updatedAt: '2022.03.14 00:00',
  title: 'This is TitleThis is TitleThis is TitleThis is TitleThis is Title',
  contents: `We need DesignerIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  technicalSkill: ['react', 'ts'],
  position: 'FE',
};
