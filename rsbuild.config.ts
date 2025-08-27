import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "MyShelf",
    meta: [
      {
        name: "description",
        content: "book ranking app",
      },
    ],
    favicon: "./src/assets/logo.svg",
  },
  source: {
    define: publicVars,
  },
});
