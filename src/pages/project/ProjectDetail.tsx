import { Link, useParams } from 'react-router-dom';

// import React from 'react'

export default function ProjectDetail() {
  const { projectId } = useParams();

  return (
    <div>
      <h1>{projectId}번 프로젝트!</h1>
      <h2>
        <Link to={`/projects/write/${projectId}`}>{projectId}번 수정하기</Link>
      </h2>
      <p>프로필</p>
      <p>댓글</p>
      <input type="text" />
    </div>
  );
}
