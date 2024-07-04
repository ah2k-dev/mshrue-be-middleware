import SuccessHandler from "../utils/SuccessHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import FormData from "form-data";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import dotenv from "dotenv";
dotenv.config({
  path: "../config/config.env",
});

const createFile = async (req, res) => {
  try {
    console.log(req.files, req.body);
    if (req.files === null || req.files === undefined) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    let file = req.files.file;

    file.mv(path.join(__dirname, `../../uploads`, file.name), (err) => {
      if (err) {
        console.log(err);
        return ErrorHandler(err.message, 500, req, res);
      }
    });
// expires_at in miliseconds
    const expires_at = Date.now() + 1000 * 60 * 60 * 24 * 30;

    const data = new FormData();
    data.append("title", req.body.title);
    data.append("purpose", req.body.purpose);
    // expires at will be in miliseconds
    data.append("expires_at", expires_at);
    data.append("file_link_create", "true");
    data.append(
      "file",
      fs.createReadStream(path.join(__dirname, `../../uploads`, file.name))
    );

    console.log(process.env.TAP_BUSINESS_API_KEY);

    const response = await axios.post(
      "https://api.tap.company/v2/files",
      data,
      {
        headers: {
          // Authorization: `Bearer ${process.env.TAP_BUSINESS_API_KEY}`,
          Authorization: `Bearer sk_test_7lvSPa1sXVi6WdI0qGNHC4xU`,
          Accept: "application/json",
          ...data.getHeaders(),
        },
      }
    );

    return SuccessHandler(
      {
        message: "File Uploaded Successfully",
        response: response.data,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const createBusiness = async (req, res) => {
  try {
    const { businessPayload } = req.body;

    const response = await axios.post(
      "https://api.tap.company/v2/business",
      businessPayload,
      {
        headers: {
          // Authorization: `Bearer ${process.env.TAP_BUSINESS_API_KEY}`,
          Authorization: `Bearer sk_test_7lvSPa1sXVi6WdI0qGNHC4xU`,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...businessPayload.getHeaders(),
        },
      }
    );

    return SuccessHandler(
      {
        message: "Business Created Successfully",
        response: response.data,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

// const authorize = async (req, res) => {
//   try {
//   } catch (error) {
//     return ErrorHandler(error.message, 500, req, res);
//   }
// };
// const getAuthorization = async (req, res) => {
//   try {
//   } catch (error) {
//     return ErrorHandler(error.message, 500, req, res);
//   }
// };
// const getSavedCards = async (req, res) => {
//   try {
//   } catch (error) {
//     return ErrorHandler(error.message, 500, req, res);
//   }
// };
// const createToken = async (req, res) => {
//   try {
//   } catch (error) {
//     return ErrorHandler(error.message, 500, req, res);
//   }
// };

export default {
  createFile,
  createBusiness,
  // authorize,
  // getAuthorization,
  // getSavedCards,
  // createToken,
};
