import { useNavigate } from 'react-router-dom';

const useProjectList = () => {
  const navigate = useNavigate();
  const handleFabClick = () => {
    navigate('/projects/write');
  };
  return {
    handleFabClick,
    data: [
      {
        name: '저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨저쩌구씨',
        projectTitle:
          'ProjectABCDEFGHIJKLMNOPProjectABCDEFGHIJKLMNOPProjectABCDEFGHIJKLMNOP',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
      {
        name: '저쩌구씨',
        projectTitle: 'ProjectA',
        imageUrl: 'https://source.unsplash.com/random',
      },
    ],
  };
};

export default useProjectList;
