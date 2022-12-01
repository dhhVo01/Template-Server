import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./models/db.js";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


main().catch(err => console.log(err));

async function main() {
  await db.mongoose.connect(db.url);
  console.log("MongoDB Connected");
}

import userRouter from "./routes/user.router.js";

app.use("/user", userRouter);



app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}.`);
});