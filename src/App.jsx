import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "providers/UserProvider";
import DashboardPage from "pages/Dashboard";
import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";
import ProductPage from "pages/Product";
import UserPanelPage from "pages/UserPanel/UserPanel.container";
import OrdersHistoryPage from "pages/OrdersHistory/OrdersHistory.container";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "*",
          element: <div>404</div>,
        },
        {
          path: "/",
          element: <UserProvider />,
          children: [
            {
              path: "/",
              index: true,
              element: <DashboardPage />,
            },
            {
              path: "login",
              element: <LoginPage />,
            },
            {
              path: "register",
              element: <RegisterPage />,
            },
            {
              path: "product",
              element: <ProductPage />,
            },
            {
              path: "settings",
              element: <UserPanelPage />,
              children: [
                {
                  // TODO can't retrieve bundle of children components on page refresh
                  path: "orders",
                  element: <OrdersHistoryPage />,
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}

export default App;
