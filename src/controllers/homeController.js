const { ContactModel} = require("../models/ContactModel");

const index = async (req, res) => {
  const allContacts = await ContactModel.find().sort({ createdAt: -1 });

  res.render("index", {
    allContacts,
  });
};

module.exports = {
  index,
};
