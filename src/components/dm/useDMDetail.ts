const useDMDetail = () => {
  const messages = [
    {
      _id: '1',
      message: '안녕하세요 현석팀!',
      isSender: true,
    },
    {
      _id: '2',
      message: '만나서 반갑습니다.',
      isSender: false,
    },
    {
      _id: '3',
      message: '프로젝트 같이해요',
      isSender: true,
    },
    {
      _id: '4',
      message: '반갑습니다~!',
      isSender: true,
    },
    {
      _id: '5',
      message:
        '프로젝트 요구사항: 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구 어쩌구 저쩌구',
      isSender: false,
    },
    {
      _id: '6',
      message: '입니다!',
      isSender: false,
    },
    {
      _id: '7',
      message: '좋아요!',
      isSender: true,
    },

    {
      _id: '8',
      message: '👍❤️‍🔥',
      isSender: true,
    },
  ];

  return { messages };
};

export default useDMDetail;
