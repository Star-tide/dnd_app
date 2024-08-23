// router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { confirmUser } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: confirmUser,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
