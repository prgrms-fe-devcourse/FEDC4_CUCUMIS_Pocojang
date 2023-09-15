import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getPostId } from '@/api/posts/postId';
import { ProjectDetail } from '@/stores/projectDetail/slice';
import { setProjectDetailResponse } from '@/stores/projectDetail';
import { useAppSelector } from '@/stores/hooks';
import { projectDetailSelector } from '@/stores/projectDetail/selector';
import { PostType } from '@/types';

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
    const fetchPost = async (postId: string) => {
      try {
        const rs = await getPostId(postId);

        handlePost(rs);
      } catch (error) {
        console.log(error);
      }
    };

    const handlePost = (rs: PostType) => {
      const { author, comments, _id, image, createdAt } = rs;
      const { title, requirements } = JSON.parse(rs.title);

      const formattedComments = comments.map(({ _id, comment, author }) => ({
        AvatarProps: {
          imgSrc: author?.image,
        },
        author: author?.fullName,
        comment,
        userId: author?._id,
        commentId: _id,
      }));

      const formatedPost: Partial<ProjectDetail> = {
        postId: _id,
        comments: formattedComments,
        image: image,
        author: {
          image: author.image,
          userId: author._id,
          fullName: author.fullName,
        },
        createdAt,
        title,
        requirements,
      };

      dispatch(setProjectDetailResponse(formatedPost));
    };

    if (projectId) {
      fetchPost('6503ed37a14c752383b6a8c1');
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
