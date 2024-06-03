import SuccessHandler from "../utils/SuccessHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createFile = async (req, res) => {
  try {
    if (req.files === null || req.files === undefined) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    console.log("file --> ", req.files.file);
    let file = req.files.file;
  
    // const identityOptions = {
    //   method: "POST",
    //   url: "https://api.tap.company/v2/files",
    //   headers: {
    //     accept: "application/json",
    //     // "content-type": "multipart/form-data",
    //     Authorization: `Bearer sk_test_7lvSPa1sXVi6WdI0qGNHC4xU`,
    //   },
    //   data: identity,
    // };
    // axios(identityOptions)
    //   .then((res) => {
    //     console.log("data --> ",res.data);
    //   })
    //   .catch((err) => {
    //     console.log("error --> ",err.request);
    //   });
  
    // form data
    // const identity = new FormData();
    // identity.append("purpose", "identity_document");
    // identity.append("title", "identity_document");
    // identity.append("file_link_create", "true");
    // identity.append("expires_at", "1913743462");
    // identity.append("file", file);
  
    // const body = {
    //   purpose: "identity_document",
    //   title: "identity_document",
    //   file_link_create: "true",
    //   expires_at: "1913743462",
    //   file: file
    // }
  
    // const options = {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: "Bearer sk_test_7lvSPa1sXVi6WdI0qGNHC4xU",
    //   },
    //   body: JSON.stringify(body),
    // };
  
    // fetch("https://api.tap.company/v2/files", options)
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));
  
    // http.request(
    //   {
    //     host: "https://api.tap.company",
    //     path: "/v2/files",
    //     method: "POST",
    //     headers: {
    //       accept: "application/json",
    //       Authorization: "Bearer sk_test_7lvSPa1sXVi6WdI0qGNHC4xU",
    //     },
    //     body: identity,
    //   },
    //   (res) => {
    //     console.log(res);
    //   }
    // );
  
    file.mv(path.join(__dirname, `../../uploads`, file.name), (err) => {
      if (err) {
        console.log(err);
        return res.json({ err });
      }
    });
  
    var options = {
      method: "POST",
      url: "https://api.tap.company/v2/files",
      headers: {
        accept: "application/json",
        Authorization: "Bearer sk_test_7lvSPa1sXVi6WdI0qGNHC4xU",
      },
      formData: JSON.stringify({
        file: {
          value: fs.createReadStream(
            path.join(__dirname, `../../uploads`, file.name)
          ),
          options: {
            filename: file.name,
            contentType: null,
          },
        },
        file_link_create: " true",
        purpose: "identity_document",
        title: " Civil ID",
      }),
    };
  
    axios(options)
      .then(function (response) {
        // console.log("response --> ", response);
        console.log(response.data);
      })
      .catch(function (error) {
        let json = error.response.data;
        console.log("error --> ",json);
      });
  
    const filePath = `/uploads/${file.name}`;
    return res.json({ filePath });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
const createBusiness = async (req, res) => {
  try {
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
const authorize = async (req, res) => {
  try {
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
const getAuthorization = async (req, res) => {
  try {
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
const getSavedCards = async (req, res) => {
  try {
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
const createToken = async (req, res) => {
  try {
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

export default {
  createFile,
  createBusiness,
  authorize,
  getAuthorization,
  getSavedCards,
  createToken,
};
