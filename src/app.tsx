import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MantineProvider, Text } from "@mantine/core";
import { getRoutes } from "./get-routes.ts";

const routes = getRoutes();

const App = function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Text>Welcome to vite-boilerplate!</Text>
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
    </React.StrictMode>
  );
};

export { App };
