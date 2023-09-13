const useNotifications = () => {
  const notificationMessage: { [key: string]: string } = {
    COMMENT: '님이 포스트에 댓글을 작성했습니다',
    MESSAGE: '님이 메세지를 보냈습니다',
    LIKE: '님이 포스트에 좋아요',
    FOLLOW: '님이 팔로우 했습니다',
  } as const;

  const dummyNotifications = [
    { _id: '1', type: 'COMMENT', seen: true, name: 'user1' },
    { _id: '2', type: 'MESSAGE', seen: true, name: 'user2' },
    { _id: '3', type: 'FOLLOW', seen: false, name: 'user3' },
    { _id: '4', type: 'COMMENT', seen: false, name: 'user4' },
    { _id: '5', type: 'MESSAGE', seen: true, name: 'user5' },
    { _id: '6', type: 'LIKE', seen: true, name: 'user6' },
    { _id: '7', type: 'COMMENT', seen: false, name: 'user7' },
    { _id: '8', type: 'LIKE', seen: true, name: 'user8' },
    { _id: '9', type: 'COMMENT', seen: true, name: 'user9' },
    { _id: '10', type: 'MESSAGE', seen: true, name: 'user10' },
  ];

  return { notificationMessage, notifications: dummyNotifications };
};

export default useNotifications;
