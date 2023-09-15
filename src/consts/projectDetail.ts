const DUMMY_DATA = {
  likes: [],
  comments: [
    {
      AvatarProps: {
        isUserOn: true,
      },
      userId: '2',
      author: '작성자2',
      createdAt: '2022.03.14 00:00',
      comment:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      AvatarProps: {
        isUserOn: false,
      },
      userId: '3',
      createdAt: '2022.03.14 00:00',
      author: '작성자3',
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
      isLastItem: true,
    },
  ],
  postId: '1',
  image: '/assets/Logo96.svg',
  author: {
    image:
      'https://img.freepik.com/free-photo/world-smile-day-emojis-arrangement_23-2149024491.jpg?q=10&h=200',
    isUserOn: true,
    fullName: '사용자1',
    userId: '1',
  },
  createdAt: '2022.03.14',
  updatedAt: '2022.03.14 00:00',
  title: 'This is Title',
  requirements: `We need DesignerIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
};
export default DUMMY_DATA;
