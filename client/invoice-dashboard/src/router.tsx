import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Invoices from "./pages/Invoices";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/bills", element: <Bills /> },
      { path: "/expenses", element: <Expenses /> },
      { path: "/reports", element: <Reports /> },
      { path: "/invoices", element: <Invoices /> },
    ],
  },
]);

export default router;
