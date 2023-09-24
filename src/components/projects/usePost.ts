import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getPost } from '@/api/posts';
import type { PostType } from '@/types';
import { useAppSelector } from '@/stores/hooks';
import { userIdSelector, isLoginSelector } from '@/stores/auth';
import handleAxiosError from '@/utils/axiosError';
import { LOGIN_URL } from '@/consts/routes';

export interface ProjectContent {
  title: string;
  requirements: string;
}

const usePost = () => {
  const { projectId } = useParams();
  const userId = useAppSelector(userIdSelector);
  const isLogin = useAppSelector(isLoginSelector);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState({
    title: '',
    requirements: '',
    authorId: '',
  });
  const [fileData, setFileData] = useState<{
    selectedFile: File | null;
    imageFile: string | null;
  }>({
    selectedFile: null,
    imageFile: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0] || null;

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFileData({
            selectedFile: file,
            imageFile: reader.result as string,
          });
        };
      }
    }
  };

  const fetchPost = useCallback(async (postId: string) => {
    setIsLoading(true);

    try {
      const rs = await getPost(postId);

      handlePost(rs);
    } catch (error: unknown) {
      const axiosErrorMessage = handleAxiosError(error as Error);

      setErrorMessage(axiosErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePost = (rs: PostType) => {
    const { title, requirements } = JSON.parse(rs.title);

    setContents({ title, requirements, authorId: rs.author._id });
  };

  useEffect(() => {
    if (!isLogin) {
      navigate(LOGIN_URL);
    } else if (contents.authorId && userId !== contents.authorId) {
      throw new Error('잘못된 접근입니다');
    }
  }, [isLogin, navigate, userId, contents.authorId]);

  useEffect(() => {
    projectId && fetchPost(projectId);
  }, [projectId, fetchPost]);

  useEffect(() => {
    if (errorMessage) {
      throw new AxiosError(errorMessage);
    }
  }, [errorMessage]);

  return {
    projectId,
    prevTitle: contents.title,
    prevRequirements: contents.requirements,
    isLoading,
    setIsLoading,
    handleFileChange,
    ...fileData,
  };
};

export default usePost;
