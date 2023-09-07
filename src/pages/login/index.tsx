import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <p>
          <input type="text" name="" id="" />
        </p>
        <p>
          <input type="password" name="" id="" />
        </p>
        <button>로그인</button>
        <button>
          <Link to="/signup/step1">회원가입</Link>
        </button>
      </form>
    </div>
  );
}
