import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div>
      <h1>sign up</h1>
      <input type="email" name="" id="" />
      <p>
        <Link to="/signup/step2">다음</Link>
      </p>
    </div>
  );
}
