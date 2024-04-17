import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lists from "./Lists.jsx";
import Updatename from "./Updatename.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
  {
    path: "/lists",
    element: <Lists />
  },
  {
    path: "/update/:id",
    element: <Updatename />
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
