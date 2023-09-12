import { Link, useParams } from 'react-router-dom';

export default function DeveloperDetail() {
  const { developerId } = useParams();

  return (
    <div>
      <h1>{developerId}번 개발자!</h1>
      <button>팔로우</button>
      <Link to={`/dm/${developerId}`}>DM</Link>
      <h2>댓글 다는 공간</h2>
    </div>
  );
}
