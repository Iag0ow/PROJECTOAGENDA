const { validationResult } = require("express-validator");
const validateEdit = (req, res, next) => {
  const extractedErros = [];
  const errors = validationResult(req);
  if (!errors.isEmpty() && req.session.user) {
    errors.array().map((err) => extractedErros.push(err.msg));
    req.flash("errors", extractedErros);
    req.session.save(function () {
      return res.redirect(`/contato/index/${req.params.id}`);
    });
    return;
  }

  next();
};

module.exports = validateEdit;
