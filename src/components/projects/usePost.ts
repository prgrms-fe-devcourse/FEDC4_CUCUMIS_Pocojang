import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPostId } from '@/api/posts/postId';
import type { PostType } from '@/types';

export interface ProjectContent {
  title: string;
  requirements: string;
}

const usePost = () => {
  const { projectId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState({ title: '', requirements: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async (postId: string) => {
      setIsLoading(true);

      try {
        const rs = await getPostId(postId);

        handlePost(rs);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) {
      fetchPost(projectId);
    }
  }, [projectId]);

  const handlePost = (rs: PostType) => {
    const { title, requirements } = JSON.parse(rs.title);

    setContents({ title, requirements });
  };

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

  return {
    projectId,
    ...contents,
    isLoading,
    handleFileChange,
    selectedFile,
    imageFile,
  };
};

export default usePost;
