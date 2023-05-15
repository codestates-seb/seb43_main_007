import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react(), tsconfigPaths()],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// const outDir = "public";

// export default defineConfig({
//    plugins: [react()],
//    build: {
//       assetsDir: path.relative("src", outDir),
//    },
// });
