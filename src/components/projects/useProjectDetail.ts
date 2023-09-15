import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import DUMMY_DATA from '@/consts/projectDetail';
import { getPostId } from '@/api/posts/postId';

const useProjectDetail = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleClick = (url: string, id: string) => {
    navigate(url + id);
  };

  const handleProjectDetail = async (postId: string) => {
    try {
      await getPostId(postId);
      // models PostType
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      handleProjectDetail(projectId);
    }
    // 예외처리 잘못된 요청
  }, [projectId]);

  return {
    projectId,
    handleClick,
    isAuthor: true,
    ...DUMMY_DATA,
  };
};

export default useProjectDetail;
