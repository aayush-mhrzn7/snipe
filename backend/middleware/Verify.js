import jwt from "jsonwebtoken";
export function Authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });
    console.log(decodedToken);
    req.user = decodedToken?.id;
    next();
  } catch (error) {
    console.log("error in authentication", error);
    res.status(401).json({ message: "Unauthorized" });
    next();
  }
}
