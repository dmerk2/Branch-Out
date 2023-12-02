import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import store from "./utils/store";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import Login from "./pages/Login.jsx";
import Post from "./pages/Post.jsx";
import EditPost from "./pages/EditPost.jsx";
import Friends from "./pages/Friends.jsx";

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
    {/* <Provider store={store}> */}
      <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>
);
