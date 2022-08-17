import React from "react";
import { Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import { Main } from "./main/index.tsx";

const App = function App() {
  return (
    // <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route key="main" path="/*" element={<Main />} />
      </Routes>
    </MantineProvider>
    // </React.StrictMode>
  );
};

export { App };
