import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from 'providers/UserProvider';
import DashboardPage from 'pages/Dashboard';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '*',
          element: <div>404</div>
        }, {
          path: '/',
          element: <UserProvider />,
          children: [
            {
              path: '/',
              index: true,
              element: <DashboardPage />,
            },
            {
              path: 'login',
              element: <LoginPage />
            }, {
              path: 'register',
              element: <RegisterPage />
            }
          ]
        }, 
      ])}
    />
  );
}

export default App;
