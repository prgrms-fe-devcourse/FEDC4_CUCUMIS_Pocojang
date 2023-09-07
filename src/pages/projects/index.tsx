import { Link } from 'react-router-dom';

export default function ProjectPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/projects/1">1번 프로젝트</Link>
        </li>
        <li>
          <Link to="/projects/2">2번 프로젝트</Link>
        </li>
        <li>
          <Link to="/projects/3">3번 프로젝트</Link>
        </li>
        <li>
          <Link to="/projects/4">4번 프로젝트</Link>
        </li>

        <h1>
          <Link to="/projects/write">글쓰기</Link>
        </h1>
      </ul>
    </div>
  );
}
