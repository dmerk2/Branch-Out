import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store";
import Home from "./layouts/Home.jsx";
import Profile from "./layouts/Profile.jsx";
import ChatRoom from "./layouts/ChatRoom.jsx";
import Login from "./layouts/Login.jsx";
import Post from "./layouts/Post.jsx";
import EditPost from "./layouts/EditPost.jsx";
import Friends from "./layouts/Friends.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Not found</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "chatroom",
        element: <ChatRoom />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
      {
        path: "post/:id/edit",
        element: <EditPost />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
