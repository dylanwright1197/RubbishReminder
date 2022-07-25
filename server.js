import express from "express";
import path from "path";
import bodyParser from "body-parser";

import { runBinFinder } from "./bin.js";

const app = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/bins/:uprn", async (req, res) => {
  const binMap = await runBinFinder(req.params.uprn);
  res.send({ bins: JSON.stringify(binMap) });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
