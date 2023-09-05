import { Link } from 'react-router-dom';

// import React from 'react'

export default function Header() {
  return (
    <header>
      <Link to="/login">로그인</Link>
      <Link to="/notification">알림!</Link>
    </header>
  );
}
