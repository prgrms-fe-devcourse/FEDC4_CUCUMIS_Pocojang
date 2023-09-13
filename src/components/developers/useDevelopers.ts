const useDevelopers = () => {
  const AvatarProps = {
    imgSrc: 'https://source.unsplash.com/random',
    isUserOn: true,
  };
  const dummyOnlineUsers = [
    { _id: 1, AvatarProps, label: 'user1' },
    { _id: 2, AvatarProps, label: 'user1' },
    { _id: 3, AvatarProps, label: 'user1' },
    { _id: 4, AvatarProps, label: 'user1' },
    { _id: 5, AvatarProps, label: 'user1' },
    { _id: 6, AvatarProps, label: 'user1' },
    { _id: 7, AvatarProps, label: 'user1' },
    { _id: 8, AvatarProps, label: 'user1' },
  ];
  const dummyDevelopers = [
    {
      _id: '1',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: [],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '2',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: ['react', 'js'],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '3',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: ['react', 'js', 'javascripttypscrpitnodebabelwebpack', 'node.js'],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '4',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: ['react', 'js', 'javascript', 'node.js'],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '5',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: [
        'react',
        'js',
        'javascript',
        'node.js',
        '넥슽',
        'next.js',
        'NEXT.js',
      ],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '6',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: [
        'react',
        'js',
        'javascript',
        'node.js',
        '넥슽',
        'next.js',
        'NEXT.js',
      ],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '7',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: [
        'react',
        'js',
        'javascript',
        'node.js',
        '넥슽',
        'next.js',
        'NEXT.js',
      ],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '8',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: [
        'react',
        'js',
        'javascript',
        'node.js',
        '넥슽',
        'next.js',
        'NEXT.js',
      ],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
    {
      _id: '9',
      AvatarProps,
      oneliner: '동해물과 백두산이 마르고 닳도록 ',
      name: '어쩌구씨',
      stacks: [
        'react',
        'js',
        'javascript',
        'node.js',
        '넥슽',
        'next.js',
        'NEXT.js',
      ],
      description:
        '사람들은 다양한 이유로 웹 앱 또는 네이티브 앱을 선호합니다. React는 동일한 기술을 사용하여 웹 앱과 네이티브 앱을 모두 만들 수 있습니다. 각 플랫폼의 강점을 활용하여 모든 플랫폼에 적합한 인터페이스를 구현할 수 있습니다.',
    },
  ];

  return {
    onlineDevelopers: dummyOnlineUsers,
    developers: dummyDevelopers,
  };
};

export default useDevelopers;
