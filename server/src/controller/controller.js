function authenticate(req, res, next) {
  console.log(req.session.username);
  if (req.session.username) {
    next();
  } else {
    res.status(401).send("You are not logged in");
  }
}

export default authenticate;
