import { body, validationResult } from "express-validator";
import ErrorHandler from "../../utils/ErrorHandler.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ErrorHandler(errors.array()[0].msg, 400, req, res);
  }
  next();
};

export default {
  
};
