const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');



const hostname = 'localhost';
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  /* res.writeHead(200, { "Content-Type" : "text/html" })
  res.end('Hello World\n'); */

  let filePath;

  const baseHTML = [
    "about",
    "contact-me"
  ]

  if (baseHTML.includes(path.basename(req.url))) {
    filePath = path.join(__dirname, 'public', req.url + ".html")


  } else {
    filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
  }




  let extname = path.extname(filePath);

  let contentType = "text/html";

  switch (extname) {

    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    
    
  }
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, content) => {
          res.writeHead(200, { "Content-Type" : "text/html" })
          res.end(content, "utf8")
        })
      } else {
        res.writeHead(500)
        res.end(`Server error: ${err.code}`);
      }

    } else {
      res.writeHead(200, { "Content-Type" : contentType })
      res.end(content, "utf8")
    }

  })

});

server.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});