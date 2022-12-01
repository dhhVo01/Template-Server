import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Tài khoản không được để trống!"],
        minLength: [8, "Tài khoản phải có tối thiểu 8 ký tự!"],
        maxLength: [32, "Tài khoản chỉ được tối đa 32 ký tự!"]
    },
    password: {
        type: String,
        required: [true, "Password không được để trống!"],
        minLength: [8, "Mật khẩu phải có tối thiểu 8 ký tự!"]
    },
    token: String
});
const User = mongoose.model("User", userSchema, "users");

export default User;