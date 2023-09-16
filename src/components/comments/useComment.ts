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
      await createComments({
        comment: input,
        postId,
      });

      setRefreshPage((prev) => !prev);
    };

    submitComment();
  }, [input, postId]);

  return {
    refreshPage,
  };
};

export default useComment;
