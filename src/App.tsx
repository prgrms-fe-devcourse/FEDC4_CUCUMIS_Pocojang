import { RouterProvider } from 'react-router-dom';

import { router } from './routes/appRouter';

// import React from 'react'

export default function App() {
  return <RouterProvider router={router} />;
}
