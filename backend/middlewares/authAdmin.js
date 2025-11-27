import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    // console.log(req.headers);

    const atoken = req.headers.atoken;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorised, Login Again__",
      });
    }

    const admin_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (admin_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorised, Login Again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
