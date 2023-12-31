import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

import { getPost } from '@/api/posts';
import type { PostType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { userIdSelector, isLoginSelector } from '@/stores/auth';
import handleAxiosError from '@/utils/axiosError';
import { LOGIN_URL } from '@/consts/routes';
import { isLoadingSelector } from '@/stores/projectDetail/selector';
import { setIsLoading } from '@/stores/projectDetail';

export interface ProjectContent {
  title: string;
  requirements: string;
}

const usePost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { projectId } = useParams();
  const userId = useAppSelector(userIdSelector);
  const isLogin = useAppSelector(isLoginSelector);
  const isLoading = useAppSelector(isLoadingSelector);

  const [contents, setContents] = useState({
    title: '',
    requirements: '',
    authorId: '',
  });
  const [fileData, setFileData] = useState<{
    selectedFile: File | null;
    imageFile: string | null;
    fileName: string;
  }>({
    selectedFile: null,
    imageFile: null,
    fileName: '',
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
            fileName: file.name,
          });
        };
      }
    }
  };

  const fetchPost = useCallback(
    async (postId: string) => {
      dispatch(setIsLoading(true));

      try {
        const rs = await getPost(postId);

        handlePost(rs);
      } catch (error: unknown) {
        const axiosErrorMessage = handleAxiosError(error as Error);

        setErrorMessage(axiosErrorMessage);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch],
  );

  const handlePost = (rs: PostType) => {
    const { title, requirements } = JSON.parse(rs.title);
    setFileData((prev) => ({
      ...prev,
      imageFile: rs.image ?? null,
      fileName: rs.image
        ? 'image : ' + rs.createdAt.replace('T', ' ').slice(0, -5)
        : '',
    }));

    setContents({ title, requirements, authorId: rs.author._id });
  };
  const handleDeleteFileData = () => {
    setFileData({ selectedFile: null, imageFile: null, fileName: '' });
  };

  const setLoadingState = (isLoading: boolean) => {
    dispatch(setIsLoading(isLoading));
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
    handleFileChange,
    setLoadingState,
    handleDeleteFileData,
    ...fileData,
  };
};

export default usePost;
