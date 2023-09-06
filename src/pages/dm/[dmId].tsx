import { useParams } from 'react-router-dom';

export default function DMPage() {
  const { dmId } = useParams();
  return (
    <div>
      <h1>DM대상 : {dmId}</h1>
    </div>
  );
}
