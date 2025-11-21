import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const adminToken = req.headers.admintoken;

    if (!adminToken) {
      return res.json({
        success: false,
        message: "Not Authorised, Login Again",
      });
    }

    const admin_decode = jwt.verify(adminToken, process.env.JWT_SECRET);

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
