// // vite.config.js
// const middleware = () => {
//   return {
//     name: "middleware",
//     apply: "serve",
//     configureServer(viteDevServer) {
//       return () => {
//         viteDevServer.middlewares.use(async (req, res, next) => {
//           if (!req.originalUrl.endsWith(".html") && req.originalUrl !== "/") {
//             req.url = `/src/` + req.originalUrl + ".html";
//           } else if (req.url === "/index.html") {
//             req.url = `/src/` + req.url;
//           }

//           next();
//         });
//       };
//     },
//   };
// };

// export default {
//   plugins: [middleware()],
//   root: "src",
//   publicDir: "../public",
//   resolve: {
//     alias: { "/src": resolve(process.cwd(), "src") },
//   },
//   build: {
//     outDir: "../dist",
//   },
// };

module.exports = {
  root: "src",
  build: {
    outDir: "../dist",
  },
};
