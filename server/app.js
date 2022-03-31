const http = require("http");
const url = require("url");

const { search } = require("./search.js");

const hostname = "127.0.0.1";
const port = 4040;

http
  .createServer((req, res) => {
    const { from = 0, to = 100, sortBy } = url.parse(req.url, true).query;

    res.writeHead(200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    });

    const response = JSON.stringify(search(from, to, sortBy));

    setTimeout(() => {
      res.end(response);
    }, Math.random() * 500 + 300);
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
