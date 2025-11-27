import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // console.log(req.headers);

    const token = req.headers["token"];

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorised, Login Again__",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = token_decode.id 

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;
