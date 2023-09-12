import { useNavigate } from 'react-router-dom';

const useProjectList = () => {
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate('/projects/write');
  };

  const dummyData = [
    {
      _id: '1',
      name: '저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨',
      projectTitle:
        'ProjectABCDEFGHIJKLMNOPProjectABCDEFGHIJKLMNOPProjectABCDEFGHIJKLMNOP',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '2',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '3',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '4',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '5',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '6',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '7',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '8',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
    {
      _id: '9',
      name: '저쩌구씨',
      projectTitle: 'ProjectA',
      imageUrl: 'https://source.unsplash.com/random',
    },
  ];
  return {
    handleFabClick,
    data: dummyData,
  };
};

export default useProjectList;
