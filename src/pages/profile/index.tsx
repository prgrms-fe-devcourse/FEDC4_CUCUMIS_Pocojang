import { Link, useParams } from 'react-router-dom';

import BasicAvatar from '@/components/shared/avatar';
export default function ProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      <BasicAvatar isUserOn={true} size={90} />
      {userId}의 프로필
      <Link to="/settings">프로필 수정</Link>
      <Link to="/dm">DM</Link>
    </div>
  );
}
