const express = require("express");
const cors = require("cors");
const next = require("next");
const dotenv = require('dotenv').config();

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

//Configuration requires
const ConfigurationModel = require("./api/models/inputs.json");
const ConfigurationService = require("./api/services/ConfigurationService");
const ConfigurationController = require("./api/controllers/ConfigurationController");


//Configuration instances
const ConfigurationServiceInstance = new ConfigurationService(
  ConfigurationModel
);

const ConfigurationControllerInstance = new ConfigurationController(
  ConfigurationServiceInstance
);

// Database require
const mongodbConnection = require("./api/db/mongodbConnection");

// Database connection
mongodbConnection().then(() => {
  console.log("Database connected.");
}).catch(err => console.log(err));

app.prepare().then(() => {
  const server = express();
  server.use(express.json())

  // Configuring the user routes
  server.use("/api", require("./api/routes/user"));

  // Get configuration by path
  server.get("/configuration/:path", (req, res) =>
    ConfigurationControllerInstance.get(req, res)
  );

  server.post("/:path", (req, res) => {
    console.log(req.body);

    return res.sendStatus(200);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});