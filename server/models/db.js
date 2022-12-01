import mongoose from "mongoose";
import url from "../config/db.config.js";
import User from "./user.model.js";
mongoose.Promise = global.Promise;

const db = {
  "mongoose": mongoose,
  "url": url,
  "users": User
};

export default db;