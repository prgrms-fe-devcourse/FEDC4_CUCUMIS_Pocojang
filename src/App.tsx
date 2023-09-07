import { RouterProvider } from 'react-router-dom';

import { router } from './routes/appRouter';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
