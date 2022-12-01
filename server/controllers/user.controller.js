import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/db.js";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



export async function signup(req, res){
    let ValidatorError = ({
        username: "",
        password: ""
    })
    const { username, password } = req.body;
    const oldUsername = await db.users.findOne({username});
    if (oldUsername){
        ValidatorError.username = "Tài khoản đã tồn tại!";
        res.send({ValidatorError});
    }
    else{
        try{
            const hash = password.length >= 8 ? bcrypt.hashSync(password, salt) : password;
            const privateKey = process.env.PRIVATE_KEY;
            const newUser = await db.users.create({
                username: username,
                password: hash,
            });
            newUser.token = jwt.sign({user_id: newUser._id, username}, privateKey, {expiresIn: "2h"});
            res.send(newUser);
        }catch(e)
        {
            ValidatorError.username = e.errors.username ? e.errors.username.message : "";
            ValidatorError.password = e.errors.password ? e.errors.password.message : "";
            res.send({ValidatorError});
        }
    }
}
export async function login(req, res){
    let ValidatorError = ({
        username: "",
        password: ""
    })
    const { username, password } = req.body;
    const User = await db.users.findOne({username});
    const privateKey = process.env.PRIVATE_KEY;
    if (!User){
        ValidatorError.username = "Tài khoản không tồn tại!";
        res.send({ValidatorError});
    }
    else if (bcrypt.compareSync(password, User.password))
    {
        User.token = jwt.sign({user_id: User._id, username}, privateKey, {expiresIn: "2h"});
        res.send(User);
    }
    else
    {
        ValidatorError.password = "Mật khẩu không chính xác!";
        res.send({ValidatorError});
    }

}