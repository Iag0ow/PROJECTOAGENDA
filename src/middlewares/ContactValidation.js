const { body } = require("express-validator");

const ContactCreateValidation = () => {
  return [
    body("nameContact")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter ao menos 3 caracteres"),
    body("email").optional().isEmail().withMessage("Insira um e-mail válido."),
  ];
};

module.exports = {
  ContactCreateValidation,
};
