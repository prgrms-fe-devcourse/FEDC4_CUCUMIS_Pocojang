import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div>
      <h1>sign up</h1>
      <form>
        <input type="email" name="" id="" />
        <p>
          <button>
            <Link to="/signup/step2">다음</Link>
          </button>
        </p>
      </form>
    </div>
  );
}
