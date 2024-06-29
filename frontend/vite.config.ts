import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// console.log(process.env.BACKEND_URL);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://backend.eazylearn.xyz",
        secure: false,
      },
    },
  },
});

//export default defineConfig(({ mode }) => {
// Load env file based on `mode` in the current working directory.
// Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//const env = loadEnv(mode, process.cwd(), "");

//return {
//plugins: [react()],
// server: {
//   proxy: {
//     "/api": {
//       target: env.BACKEND_URL,
//       changeOrigin: true,
//       secure: false,
//     },
//   },
// },
//};
//});

// https://vitejs.dev/config/
