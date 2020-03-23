let express = require("express");
let http = require("http");

let app = express();
app.use(express.static("public"));

// Create Server
let port = process.env.PORT || 3000;
let server = http.createServer(app).listen(port, function() {
  console.log("Listening on port " + port + "...");
});
