const {
  ContactModel,
  searchById,
  deleteId,
} = require("../models/ContactModel");

const contactIndex = (req, res) => {
  res.render("contact", {
    contact:{}
  });
};

const registerContact = async (req, res) => {
  const { nameContact, lastName = "", email = "", telephone = "" } = req.body;
  const contact = await ContactModel.create({
    nameContact,
    lastName,
    email,
    telephone,
  });
  req.flash("success", "Contato registrado com sucesso.");
  req.session.save(function () {
    return res.redirect(`/contato/index/${contact._id}`);
  });
  return;
};

const EditContact = async (req, res) => {
  if (!req.params.id) return res.render("404");
  const contact = await searchById(req.params.id);
  if (!contact) return res.render("404");
  res.render("contact", {contact});
};

const edit = async(req,res) => {
  if (!req.params.id) return res.render("404");
  const id = await searchById(req.params.id);
  const contact = await ContactModel.findByIdAndUpdate(id,req.body, {new:true})
  req.flash("success", "Contato alterado com sucesso.");
  req.session.save(function () {
    return res.redirect(`/contato/index/${contact._id}`);
  });
  return;
}

const deleteContact = async(req,res) => {
    if (!req.params.id) return res.render("404");
    const contactIdDelete = await deleteId(req.params.id);
    if (!contactIdDelete) return res.render("404");
      req.flash("success", "Contato apagado com sucesso.");
      req.session.save(function () {
        return res.redirect("/");
      });
      return;
}

module.exports = {
  contactIndex,
  registerContact,
  EditContact,
  edit,
  deleteContact,
};
