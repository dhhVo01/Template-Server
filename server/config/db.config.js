import * as dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URI;
export default url;