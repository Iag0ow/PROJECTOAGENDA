const LoginModel = require("../models/LoginModel");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await LoginModel.findOne({ email });
  if (!user) {
    req.flash("errors", "Usuário não existe");
    req.session.save(function () {
      return res.redirect("/login/index");
    });
    return;
  }
  if (!(await bcryptjs.compare(password, user.password))) {
    req.flash("errors", "Senha inválida");
    req.session.save(function () {
      return res.redirect("/login/index");
    });
    return;
  }
  req.flash("success", "Entrou no sistema.");
  req.session.user = user;

  req.session.save(function () {
    return res.redirect("/");
  });
  return;
};

const loginPage = (req, res) => {
  if (req.session.user) return res.render("login-logado");
  res.render("login");
};

const register = async (req, res) => {
  const { _csrf, email, password } = req.body;
  const salt = bcryptjs.genSaltSync();
  const hash = bcryptjs.hashSync(password, salt);
  const user = await LoginModel.findOne({ email });

  if (user) {
    req.flash("errors", "Este E-mail já está sendo utilizado.");
    req.session.save(function () {
      return res.redirect("/login/index");
    });
    return;
  }

  LoginModel.create({ _csrf, email, password: hash });
  req.flash("success", "Seu usuário foi criado com sucesso.");
  req.session.save(function () {
    return res.redirect("/login/index");
  });

  return;
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login/index");
};

module.exports = {
  login,
  register,
  loginPage,
  logout,
};
