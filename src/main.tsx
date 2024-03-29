import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { antdTheme } from "./configs/antdTheme.ts";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./AppLayout.tsx";
import PostPage from "./pages/Post/PostPage.tsx";
import CategoryPage from "./pages/Category/CategoryPage.tsx";
import CreatePostPage from "./pages/Post/CreatePostPage.tsx";
import CreateCategory from "./pages/Category/CreateCategory.tsx";
import QueryClientProvider from "./HOC/QueryClientProvider.tsx";
import EditPostPage from "./pages/Post/EditPostPage.tsx";
import EditCategory from "./pages/Category/EditCategory.tsx";

import LoginPage from "./pages/auth/LoginPage.tsx";
import UserTablePage from "./pages/admin/UserTablePage.tsx";
import CreateUserPage from "./pages/admin/CreateUserPage.tsx";
import ProtectedRoute from "./HOC/ProtectedRoute";

// import "suneditor/dist/css/suneditor.min.css";
import "./index.scss";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          { path: "/posts", element: <PostPage /> },
          { path: "/users", element: <UserTablePage /> },
          { path: "/create-user", element: <CreateUserPage /> },
          { path: "/create-post", element: <CreatePostPage /> },
          { path: "/create-category", element: <CreateCategory /> },
          { path: "/category", element: <CategoryPage /> },
          { path: "/edit-post/:slug", element: <EditPostPage /> },
          { path: "/edit-category/:slug", element: <EditCategory /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider>
      <ConfigProvider theme={antdTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
