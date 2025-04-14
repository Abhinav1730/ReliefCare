import jwt from "jsonwebtoken";

//Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const doctorToken = req.headers.doctortoken;
    //console.log(doctorToken)
    if (!doctorToken) {
      return res.json({
        success: false,
        message: "Not Authorised , Login Again",
      });
    }
    const decodedtoken = jwt.verify(doctorToken, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.docId = decodedtoken.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
