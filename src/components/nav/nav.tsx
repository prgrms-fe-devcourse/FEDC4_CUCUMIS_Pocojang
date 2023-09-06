import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/projects">프로젝트</Link>
        </li>
        <li>
          <Link to="/developers">개발자</Link>
        </li>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/dm">DM</Link>
        </li>
        <li>
          {/* 아이디를 얻어와야 함 */}
          <Link to="/profile/1">프로필</Link>
        </li>
      </ul>
    </nav>
  );
}
