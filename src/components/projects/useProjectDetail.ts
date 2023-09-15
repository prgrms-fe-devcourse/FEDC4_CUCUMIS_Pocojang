import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getPostId } from '@/api/posts/postId';
import { ProjectDetail } from '@/stores/projectDetail/slice';
import { setProjectDetailResponse } from '@/stores/projectDetail';
import { useAppSelector } from '@/stores/hooks';
import { projectDetailSelector } from '@/stores/projectDetail/selector';

// import type { CommentType } from '@/types';

const useProjectDetail = () => {
  const { projectId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detail = useAppSelector(projectDetailSelector);

  const handleClick = (url: string, id: string) => {
    navigate(url + id);
  };

  useEffect(() => {
    const handleProjectDetail = async (postId: string) => {
      try {
        const rs = await getPostId(postId);

        const { title, requirements } = JSON.parse(rs.title);

        const author = {
          image: rs.author.image,
          userId: rs.author._id,
          fullName: rs.author.fullName,
        };

        const comments = rs.comments.map(({ _id, comment, author }) => ({
          AvatarProps: {
            imgSrc: author?.image,
          },
          author: author?.fullName,
          comment,
          userId: author?._id,
          commentId: _id,
        }));

        const data: Partial<ProjectDetail> = {
          postId: rs._id,
          comments,
          image: rs.image,
          author: author,
          createdAt: rs.createdAt,
          title,
          requirements,
        };
        dispatch(setProjectDetailResponse(data));
      } catch (error) {
        console.log(error);
      }
    };

    if (projectId) {
      handleProjectDetail('6503ed37a14c752383b6a8c1');
    }
    // 예외처리 잘못된 요청
  }, [projectId, dispatch]);

  return {
    projectId,
    handleClick,
    isAuthor: true,
    ...detail.projectDetail,
  };
};

export default useProjectDetail;
