import { Link } from 'react-router-dom';

export default function HomePage() {

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
          <Link to="/developers/1">1번 개발자</Link>
        </li>
        <li>
          <Link to="/developers/2">2번 개발자</Link>
        </li>
        <li>
          <Link to="/developers/2">2번 개발자</Link>
        </li>
      </ul>
    </div>
  );
}
