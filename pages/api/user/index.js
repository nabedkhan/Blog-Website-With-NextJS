import withSession from "../../../utils/session";

async function user(req, res, session) {
  const user = req.session.get("user");

  if (user) {
    if (req.method === "GET") {
      res.status(200).json({ ...user, isLoggedIn: true });
    }
  } else {
    res.status(200).json({ isLoggedOut: true });
  }
}

export default withSession(user);
