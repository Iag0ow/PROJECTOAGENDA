const mongoose = require("mongoose");

// const LoginSchema = new mongoose.Schema({
//   titulo: { type: String, required: true },
//   descricao: String,
// });

const LoginSchema = new mongoose.Schema({
  _csrf: String,
  email: String,
  password: String,
});

const LoginModel = mongoose.model("Login", LoginSchema);

// class Login {
//   constructor(body) {
//     this.body = body;
//   }
// }

module.exports = LoginModel;
