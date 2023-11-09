import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PublicLayout from "./components/layouts/PublicLayout";
import ErrorPage from "./components/layouts/ErrorPage";
import { ROUTE_DATA } from "./utils/constants/interfaces";
import Home from "./pages/home/view";

const PUBLIC_ROUTES: ROUTE_DATA[] = [{ path: "/", element: <Home /> }];

const Router = () => {
  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            <Route element={<PublicLayout />} errorElement={<ErrorPage />}>
              {PUBLIC_ROUTES.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>
            {/* USE IN CASE - PROTECTED LAYOUTS REQUIRED */}
            {/* <Route element={<ProtectedLayout />} errorElement={<ErrorPage />}>
              {ROUTES.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route> */}
          </>
        )
      )}
    />
  );
};

export default Router;
