import jwt from "jsonwebtoken";

//User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorised , Login Again",
      });
    }
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedtoken);
    req.user = decodedtoken;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
