import { useEffect, useState } from 'react';

import { useAppSelector } from '@/stores/hooks';
import { layoutSelector } from '@/stores/layout';
import { createComments } from '@/api/comments/create';

interface UseCommentProps {
  postId: string;
}

const useComment = ({ postId }: UseCommentProps) => {
  const { input } = useAppSelector(layoutSelector);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const submitComment = async () => {
      try {
        await createComments({
          comment: input,
          postId,
        });
      } catch (error) {
        console.log(error);
      }
      setRefreshPage((prev) => !prev);
    };

    input && submitComment();
  }, [input, postId]);

  return {
    refreshPage,
  };
};

export default useComment;
