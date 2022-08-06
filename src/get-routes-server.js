import path from "node:path";
import { fileURLToPath } from "url";
import glob from "glob";

// function findExportName(str) {
//   return `${str[0].toUpperCase()}${str.substring(1).toLowerCase().replace(/\/./g, (match) => match[1].toUpperCase())}`;
// }

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getRoutes = async function getRoutes() {
  const routes = glob.sync(`./**/index.page.jsx`, {
    options: { cwd: `${__dirname}/`, nodir: true },
  });

  return (
    await Promise.all(
      routes.map((routeKey) => {
        const [fullPath, pathPlain] = routeKey.match(
          /\.\/(.*)\/index\.page\.jsx$/,
        );

        if (pathPlain === "shared") {
          return undefined;
        }

        const isIndex = (pathPlain === "index");

        const path = isIndex ? "" : pathPlain;

        // const route = await import(`./${fullPath.substring(6)}`);
        // const name = route.PageName;
        // const page = route.Page;

        // return ({
        //   path,
        //   name,
        //   page,
        // });

        return ({});
      }),
    )
  )
    .filter((x) => x !== undefined);
};

export { getRoutes };
