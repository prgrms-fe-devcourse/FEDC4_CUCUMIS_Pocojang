import { Link, useParams } from 'react-router-dom';

// import React from 'react'

export default function ProfilePage() {
  const { userId } = useParams();
  return (
    <div>
      {userId}의 프로필
      {/* 만약 내 프로필이라면 버튼이 존재 */}
      <Link to="/settings">프로필 수정</Link>
      <Link to="/dm">DM</Link>
    </div>
  );
}
