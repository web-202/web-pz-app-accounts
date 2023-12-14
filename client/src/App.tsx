import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from './components/HomePage';
import { ProfilePage } from './components/ProfilePage';
import { AboutUsPage } from "./components/AboutUsPage";


const router = createBrowserRouter([
  {
    path: "/accounts",
    element: <HomePage />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "/aboutus",
    element: <AboutUsPage />,
  },
  {
    path: "*",
    element: <Navigate to="/accounts" />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
