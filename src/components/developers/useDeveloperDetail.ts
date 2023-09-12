import { useParams, useNavigate } from 'react-router-dom';

const useDeveloperDetail = () => {
  const { developerId } = useParams();

  const navigate = useNavigate();

  const onClick = (url: string, id: string) => {
    navigate(url + id);
  };

  return {
    developerId,
    onClick,
    isAuthor: true,
    ...DUMMY_DATA,
  };
};

export default useDeveloperDetail;

const DUMMY_DATA = {
  likes: [],
  comments: [
    {
      AvatarProps: {
        isUserOn: false,
      },
      _id: '2',
      author: '작성자2',
      createdAt: '2022.03.14 00:00',
      comment:
        'Check out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this linkCheck out this link.',
    },
    {
      AvatarProps: {
        isUserOn: true,
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
  image:
    'https://www.zdnet.com/a/img/resize/ba1b1ab92085d777ab5e313b34c66a94b7aa1236/2023/06/05/79a43eb8-ce38-488c-8cc0-e04699aaca7f/bing.jpg?auto=webp&width=1280',
  author: {
    image:
      'https://img.freepik.com/free-photo/world-smile-day-emojis-arrangement_23-2149024491.jpg?q=10&h=200',
    isUserOn: true,
    fullName: '사용자1',
    _id: '3',
  },
  createdAt: '2022.03.14 00:00',
  updatedAt: '2022.03.14 00:00',
  title: 'This is Title',

  technicalSkill: [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Angular',
    'Vue.js',
    'Axios',
    'TypeScript',
    'Webpack',
    'Babel',
    'Sass/SCSS',
    'Redux',
    'GraphQL',
    'Jest',
    'Enzyme',
  ],
  position: 'FE',
  contents:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
};
