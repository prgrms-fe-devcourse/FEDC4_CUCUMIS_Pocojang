import { useNavigate, useParams } from 'react-router-dom';

import DUMMY_DATA from '@/consts/projectDetail';

const useProjectDetail = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleClick = (url: string, id: string) => {
    navigate(url + id);
  };

  return {
    projectId,
    handleClick,
    isAuthor: true,
    ...DUMMY_DATA,
  };
};

export default useProjectDetail;
