// import React from 'react'

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function DeveloperList() {
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get('keyword');

  console.log(inputValue);
  console.log(setSearchParams); // 주석처리 => 일단 참조를 하지 않으면 error => 억지로 참조..
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (data.length > 0) {
            alert(data);
            navigate(`/developers?keyword=${data}`);
          } else {
            alert('1글자는 입력해주세요1');
          }
        }}
      >
        <input
          type="text"
          placeholder="Search developer!"
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <button>제출!</button>
      </form>

      <ul>
        <li>
          <Link to="/developers/1">1번 개발자</Link>
        </li>
        <li>
          <Link to="/developers/2">2번 개발자</Link>
        </li>
        <li>
          <Link to="/developers/3">3번 개발자</Link>
        </li>
        <li>
          <Link to="/developers/4">4번 개발자</Link>
        </li>
        <li>
          <Link to="/developers/5">5번 개발자</Link>
        </li>
      </ul>
    </div>
  );
}
