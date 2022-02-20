const http = require("http");
const url = require("url");

const { search } = require("./search.js");

const hostname = "127.0.0.1";
const port = 4040;

http
  .createServer((req, res) => {
    const { pageNumber = 0, pageSize = 100 } = url.parse(req.url, true).query;

    res.writeHead(200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    });
    const records = search();

    const response = { records };
    res.end(JSON.stringify(response));
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
