import { Link, Route, Routes } from "react-router-dom";
import { MantineProvider, Text } from "@mantine/core";
import { getRoutes } from "./get-routes-client.js";
import { HelmetProvider } from "react-helmet-async";

const routes = getRoutes();

const App = function App() {
  return (
    <HelmetProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Text>Welcome to vite-ssr-react!</Text>
        <nav>
          <ul>
            {routes.map(({ name, path }) => {
              return (
                <li key={path}>
                  <Link to={path}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Routes>
          {routes.map(({ path, page: RouteComp }) => {
            return <Route key={path} path={path} element={<RouteComp />} />;
          })}
        </Routes>
      </MantineProvider>
    </HelmetProvider>
  );
};

export { App };
