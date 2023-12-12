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
import SignupForm from "./common/components/SignUpForm.jsx";
import OtherUserProfile from "./layouts/OtherUserProfile.jsx";
import EditProfile from "./layouts/EditProflie.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in the app.</h1>;
    }

    return this.props.children;
  }
}

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
        path: "signup",
        element: <SignupForm />,
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
        path: "profile/:id/edit",
        element: <EditProfile />,
      },
      {
        path: "/:id/friends",
        element: <Friends />,
      },
      {
        path: "profile/:id",
        element: <OtherUserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
