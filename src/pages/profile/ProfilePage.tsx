import { Link, useParams } from 'react-router-dom';
export default function ProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      {userId}의 프로필
      <Link to="/settings">프로필 수정</Link>
      <Link to="/dm">DM</Link>
    </div>
  );
}
