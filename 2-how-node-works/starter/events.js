const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("new Sale");
});

myEmitter.on("newSale", () => {
  console.log("new Sale 2");
});

myEmitter.on("newSale", (value) => {
  console.log("Value is", value);
});

myEmitter.emit("newSale", 9);

// HTTP events

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!", req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another Request received!");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
