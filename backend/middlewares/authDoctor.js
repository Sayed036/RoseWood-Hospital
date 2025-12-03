import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    // console.log(req.headers);

    const dtoken = req.headers["dtoken"];

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not Authorised, Login Again__(doctor)",
      });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = token_decode.id 

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
