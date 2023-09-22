import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPost } from '@/api/posts';
import type { PostType } from '@/types';

export interface ProjectContent {
  title: string;
  requirements: string;
}

interface PostHookParameters {
  onGetFail: (error: unknown) => void;
}

const usePost = ({ onGetFail }: PostHookParameters) => {
  const { projectId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState({ title: '', requirements: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0] || null;

      if (file) {
        setSelectedFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImageFile(reader.result as string);
        };
      }
    }
  };

  const fetchPost = useCallback(
    async (postId: string) => {
      setIsLoading(true);

      try {
        const rs = await getPost(postId);

        handlePost(rs);
      } catch (error) {
        onGetFail(error);
      } finally {
        setIsLoading(false);
      }
    },
    [onGetFail],
  );

  const handlePost = (rs: PostType) => {
    const { title, requirements } = JSON.parse(rs.title);

    setContents({ title, requirements });
  };

  useEffect(() => {
    projectId && fetchPost(projectId);
  }, [projectId, fetchPost]);

  return {
    projectId,
    prevTitle: contents.title,
    prevRequirements: contents.requirements,
    isLoading,
    handleFileChange,
    selectedFile,
    imageFile,
  };
};

export default usePost;
