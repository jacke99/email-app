import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./src/router/router.js";
// import cors from "cors";
import sessionHandler from "./middleware/sessionHandler.js";

const addr = "localhost";
const port = 3030;
const app = express();

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionHandler);

app.use("/api", router);

app.get("/health", (req, res) => {
  res.send({ state: "up", message: "Server is healthy" });
});

app.listen(port, addr, () => {
  console.log(`Server is listening on port: ${port}`);
});
