export function Authenticate(req, res, next) {
  try {
    if (req.cookies.token) {
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
      }
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken?.user;
      next();
    }
  } catch (error) {
    console.log("error in authentication", error);
    res.status(401).json({ message: "Unauthorized" });
    next();
  }
}
