import withSession from "../../../utils/session";

function logout(req, res, session) {
  if (req.method === "DELETE") {
    req.session.destroy();
    res.status(200).json({
      message: "User Logout Successfully",
    });
  }
}

export default withSession(logout);
