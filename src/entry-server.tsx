import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./app";

const render = function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>,
  );
};

export { render };
