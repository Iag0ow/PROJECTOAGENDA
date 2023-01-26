const { validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const extractedErros = [];
  const errors = validationResult(req);

  if (!errors.isEmpty() && req.session.user) {
    errors.array().map((err) => extractedErros.push(err.msg));
    req.flash("errors", extractedErros);
    req.session.save(function () {
      return res.redirect("back");
    });
    return;
  }

  if (!errors.isEmpty()) {
    errors.array().map((err) => extractedErros.push(err.msg));
    req.flash("errors", extractedErros);
    req.session.save(function () {
      return res.redirect("/login/index");
    });
    return;
  }
  next();
};

module.exports = validate;
