import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Error from "./Components/Error";
import Update from "./Components/Update";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const router = createHashRouter([
    {
      path: "/:mess?",
      element: <Login />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path: "/update/:id",
      element: <Update />,
    },

    {
      path: "*",
      element: <Error />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
