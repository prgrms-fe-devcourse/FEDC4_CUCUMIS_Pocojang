import { useParams } from 'react-router-dom';

// import React from 'react'

export default function DMPage() {
  const { dmId } = useParams();
  return (
    <div>
      <h1>DM대상 : {dmId}</h1>
    </div>
  );
}
