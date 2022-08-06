// function findExportName(str) {
//   return `${str[0].toUpperCase()}${str.substring(1).toLowerCase().replace(/\/./g, (match) => match[1].toUpperCase())}`;
// }

const getRoutes = function getRoutes() {
  const routes = import.meta.glob("./**/index.page.jsx", { eager: true });

  return Object.entries(routes)
    .map(([routeKey, route]) => {
      const [, pathPlain] = routeKey.match(/\.\/(.*)\/index\.page\.jsx$/);

      if (pathPlain === "shared") {
        return undefined;
      }

      const isIndex = (pathPlain === "index");

      const path = isIndex ? "" : pathPlain;
      const name = route.PageName;
      const page = route.Page;

      return ({
        path,
        name,
        page,
      });
    })
    .filter((x) => x !== undefined);
};

export { getRoutes };
