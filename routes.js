const express = require("express");
const route = express.Router();
const { index } = require("./src/controllers/homeController");
const { loginRequired } = require("./src/middlewares/middleware");
const {
  login,
  register,
  loginPage,
  logout,
} = require("./src/controllers/loginController");

const {
  contactIndex,
  registerContact,
  EditContact,
  edit,
  deleteContact,
} = require("./src/controllers/contatoController");

const {
  userCreateValidation,
  loginValidation,
} = require("./src/middlewares/UserValidation");
const validate = require("./src/middlewares/HandleValidator");
const validateEdit = require('./src/middlewares/HandleContactValidation')
const {
  ContactCreateValidation,
} = require("./src/middlewares/ContactValidation");

// Rotas da home
route.get("/", index);
// Rotas de login
route.get("/login/index", loginPage);
route.post("/login/register", userCreateValidation(), validate, register);
route.post("/login/login", loginValidation(), validate, login, index);
route.get("/login/logout", logout);
// Rotas de contato
route.get("/contato/index", loginRequired, contactIndex);
route.post(
  "/contato/register",
  loginRequired,
  ContactCreateValidation(),
  validate,
  registerContact
);
route.get("/contato/index/:id", loginRequired, EditContact);
route.post(
  "/contato/edit/:id",
  loginRequired,
  ContactCreateValidation(),
  validateEdit,
  edit
);
route.get("/contato/delete/:id", loginRequired, deleteContact);

module.exports = route;
