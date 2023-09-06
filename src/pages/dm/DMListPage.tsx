import { Link } from 'react-router-dom';

export default function DMList() {
  return (
    <div>
      <h1>DM List</h1>
      <ul>
        <li>
          <Link to="/dm/노철">노철</Link>
        </li>
        <li>
          <Link to="/dm/혜진">혜진</Link>
        </li>
        <li>
          <Link to="/dm/원지">원지</Link>
        </li>
        <li>
          <Link to="/dm/지성">지성</Link>
        </li>
        <li>
          <Link to="/dm/승희">승희</Link>
        </li>
      </ul>
    </div>
  );
}
