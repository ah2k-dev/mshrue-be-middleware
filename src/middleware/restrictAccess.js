import dotenv from "dotenv";
dotenv.config({
  path: "../config/config.env",
});

export default (req, res, next) => {
  const allowOrigins = [
    [
      process.env.CORS_ORIGIN_LOCAL,
      process.env.CORS_ORIGIN_DEV,
      process.env.CORS_ORIGIN_PROD,
    ],
  ];
  // uncomment before deployment
  // if (!allowOrigins.includes(req.headers["origin"])) {
  //   return res.status(401).json({
  //     message: "Not Authenticated",
  //   });
  // }

  next();
};
