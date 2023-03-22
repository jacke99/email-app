import express from "express";
import { fetchCollection } from "../mongo/emailMongoClient.js";
import authenticate from "../controller/controller.js";

const router = express.Router();

router.post("/users/login", async (req, res) => {
  let login = req.body;

  const users = await fetchCollection("users").findOne(login);
  if (users != null) {
    req.session.username = login.username;
    console.log(req.session.username);
    // res.sendStatus(200);
    res.send({
      state: "OK",
      message: "You logged in",
    });
  } else {
    res.sendStatus(401);
  }
});

router.post("/users/", async (req, res) => {
  let user = req.body;

  user.inbox = [];
  user.sent = [];

  const result = await fetchCollection("users").updateOne(
    { username: user.username },
    { $setOnInsert: user },
    { upsert: true }
  );

  if (result.matchedCount != 0) {
    res.status(400).send("Username is already taken");
  } else {
    res.status(200).send("Account created");
  }
});

router.post("/users/send", authenticate, async (req, res) => {
  let sendEmail = req.body;

  const sendTo = await fetchCollection("users").updateOne(
    { username: sendEmail.to },
    {
      $push: {
        inbox: { from: req.session.username, message: sendEmail.message },
      },
    }
  );
  if (sendTo.matchedCount === 1) {
    const sentFrom = await fetchCollection("users").updateOne(
      { username: req.session.username },
      { $push: { sent: { to: sendEmail.to, message: sendEmail.message } } }
    );
    res.status(200).send("Email was sent");
  } else {
    res.status(400).send("User was not found");
  }
});

router.post("/logout", authenticate, (req, res) => {
  req.session.destroy();
  // req.session.username = undefined;

  res.status(200).send("User was logged out");
});

router.get("/inbox", authenticate, async (req, res) => {
  console.log(req.session.username);
  const userInfo = await fetchCollection("users").findOne({
    username: req.session.username,
  });
  res.send(userInfo.inbox);
});

router.get("/sent", authenticate, async (req, res) => {
  console.log(req.session.username);
  const userInfo = await fetchCollection("users").findOne({
    username: req.session.username,
  });
  res.send(userInfo.sent);
});

export default router;
