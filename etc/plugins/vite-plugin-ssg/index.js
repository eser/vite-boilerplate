import fs from "node:fs";
import path from "node:path";
import fsExtra from "fs-extra";

function autoDiscovery(options, bundle) {
  const urls = {};

  for (const entrypoint of Object.values(bundle)) {
    for (const moduleName of Object.keys(entrypoint.modules)) {
      for (const autoDiscoverUrl of options.autoDiscoverUrls) {
        const matches = autoDiscoverUrl.exec(moduleName);

        if (matches === null || matches.length < 2) {
          continue;
        }

        const [, pathPlain] = matches;
        const url = `/${pathPlain}`;

        urls[url] = null;
      }
    }
  }

  return urls;
}

function toAbsolutePath(p) {
  return path.join(process.cwd(), p);
}

function templateDecorator(template) {
  const templateContents = fs.readFileSync(
    template,
    "utf-8",
  );

  return (source) => templateContents.replace(`<!--app-html-->`, source);
}

function findModule(bundle, outDir) {
  for (const [entrypointName, entrypoint] of Object.entries(bundle)) {
    if (entrypoint?.type !== "chunk") {
      continue;
    }

    if (entrypoint?.exports?.includes("render")) {
      const entrypointPath = `${outDir}/${entrypointName}`;

      return import(entrypointPath);
    }
  }

  return undefined;
}

function sanitizeFilename(filename) {
  return filename.replace(/[\\?%*:|"<>]/g, "-");
}

function validateUrls(urls) {
  return Object.entries(urls).reduce((acc, [url, params], idx, arr) => {
    let newUrl = url.replace(/\/+/g, "/");

    if (newUrl.slice(-1) === "/") {
      newUrl = `${url}index`;
    } else if (arr.find(([x]) => x.startsWith(`${newUrl}/`))) {
      newUrl = `${url}/index`;
    }

    newUrl = sanitizeFilename(newUrl);

    if (url !== newUrl) {
      return { ...acc, [newUrl]: { ...(params ?? {}), source: url } };
    }

    return { ...acc, [newUrl]: params };
  }, {});
}

function ssg(userOptions) {
  const options = {
    match: /src\/(.*)\/index\.page\.[tj]sx?$/,
    ...userOptions,
  };

  let isActive = false;
  let outDir = undefined;
  let outDirStatic = undefined;
  let applyTemplate = undefined;
  let bundle = undefined;

  return {
    name: "vite-plugin-ssr", // required, will show up in warnings and errors

    config(cfg, env) {
      if (env?.command === "build" && env?.ssrBuild && process.env.PRERENDER) {
        isActive = true;
        outDir = toAbsolutePath(cfg?.build?.outDir ?? "dist/server");
        outDirStatic = `${outDir}/static`;

        applyTemplate = templateDecorator(
          `${outDirStatic}/index.html`,
        );
      }
    },

    writeBundle(bundleOptions, bundleObject, isWrite) {
      bundle = bundleObject;
    },

    async closeBundle() {
      if (!isActive) {
        return undefined;
      }

      const mod = await findModule(bundle, outDir);

      if (mod === undefined) {
        throw new Error("Could not find entrypoint");
      }

      const urls = {
        ...autoDiscovery(options, bundle),
        ...options.urls ?? [],
      };

      const validatedUrls = validateUrls(urls);

      for (const [url, params] of Object.entries(validatedUrls)) {
        const source = params?.source ?? url;
        const context = params?.context ?? {};

        const dirname = path.dirname(url);

        console.log(`pre-rendering: ${url}...`);

        fsExtra.ensureDirSync(`${outDirStatic}${dirname}`);

        const htmlContents = mod.render(source, context);
        const fullHtml = applyTemplate(htmlContents);

        fs.writeFileSync(
          `${outDirStatic}${url}.html`,
          fullHtml,
        );
      }
    },
  };
}

export { ssg, ssg as default };
