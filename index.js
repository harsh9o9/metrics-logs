const express = require("express");
const client = require("prom-client");
const responseTime = require("response-time");
const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const { someHeavyTask } = require("./utils/utils");

let app = express();
let PORT = process.env.PORT || 8080;
const options = {
    transports: [
      new LokiTransport({
        host: "http://192.168.1.35:3100"
      })
    ]
  };
  const logger = createLogger(options);

let collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

let reqResTime = new client.Histogram({
  name: "http_express_req_res_time",
  help: "This tells how much time it is taking to serve the request/response",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 5, 15, 50, 100, 500, 800, 1000, 2000],
});

let totalRequestCounter = new client.Counter({
  name: "http_express_total_requests",
  help: "This tells how many requests are served",
  labelNames: ["method", "route", "status_code"],
});

app.use(
  responseTime((req, res, time) => {
    totalRequestCounter.inc({
      method: req.method,
      route: req.url,
      status_code: res.statusCode,
    });

    reqResTime
      .labels({
        method: req.method,
        route: req.url,
        status_code: res.statusCode,
      })
      .observe(time);
  })
);

app.get("/", (req, res) => {
    logger.info("Response success of / route");
  res.json({ message: "Hello World!" });
});

app.get("/slow", async (req, res) => {
  try {
    let someTask = await someHeavyTask();
    logger.info("Response success of /slow route");
    res.status(200).json({ message: someTask });
  } catch (err) {
    logger.error(`Response failure of /slow route with error ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
