import { useNavigate, useParams } from 'react-router-dom';

const useProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const onClick = (url: string, id: string) => {
    navigate(url + id);
  };

  const isAuthor = true;

  return {
    projectId,
    ...DUMMY_DATA,
    onClick,
    isAuthor,
  };
};

export default useProjectDetails;

const DUMMY_DATA = {
  likes: [],
  comments: [
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: '2',
      name: '댓글 List',
      message:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',
    },
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: '3',
      name: '댓글 List',
      message:
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
    _id: '3',
  },
  createdAt: '2022.03.14',
  updatedAt: '2022.03.14 00:00',
  title: 'This is TitleThis is TitleThis is TitleThis is TitleThis is Title',
  contents: `We need DesignerIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
};
