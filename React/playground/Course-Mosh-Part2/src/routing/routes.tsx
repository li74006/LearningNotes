import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserListPage from "./UserListPage";
import ContactPage from "./ContactPage";
import UserDetailPage from "./UserDetailPage";
import Layout from "./Layout";
import UserDetail from "./UserDetail";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        element: <PrivateRoutes />,
        children: [{ path: "users", element: <UserListPage />, children: [{ path: ":id", element: <UserDetail /> }] }],
      },

      //   { path: "users/:id", element: <UserDetailPage /> },
      //   { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default router;
