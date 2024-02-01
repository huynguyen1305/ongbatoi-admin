import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { antdTheme } from "./configs/antdTheme.ts";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.tsx";
import PostPage from "./pages/Post/PostPage.tsx";
import CategoryPage from "./pages/Category/CategoryPage.tsx";
import CreatePostPage from "./pages/Post/CreatePostPage.tsx";
import CreateCategory from "./pages/Category/CreateCategory.tsx";
import QueryClientProvider from "./HOC/QueryClientProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, path: "/posts", element: <PostPage /> },
      { path: "/create-post", element: <CreatePostPage /> },
      { path: "/create-category", element: <CreateCategory /> },
      { path: "/category", element: <CategoryPage /> },
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
