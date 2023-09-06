import { useParams } from 'react-router-dom';

export default function ProjectUpdate() {
  const { projectId } = useParams();
  return (
    <div>
      <h1>{projectId}번 수정하는 페이지</h1>
      <button>수정하기</button>
    </div>
  );
}
