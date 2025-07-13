// server.js
import jsonServer from "json-server";
// const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json", {});
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  }),
);

// Add custom routes before JSON Server router
//
// server.get("/forms", (req, res, next) => {
//   console.log(res);
//   return res.jsonp(req.query);
// });

server.use((req, res, next) => {
  if (req.method === "GET" && req.path === "/forms") {
    console.log("GET request");
    console.log(req.query);
  }

  return next();
});
// Add custom routes before JSON Server router
server.use(router);
server.listen(3008, () => {
  console.log("JSON Server is running");
  console.log("http://localhost:3008");
});
